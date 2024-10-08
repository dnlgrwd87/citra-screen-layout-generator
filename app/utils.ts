import { Buffer } from 'buffer';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { Rnd } from 'react-rnd';
import { GAMES, SCREEN_RATIOS } from './constants';
import { StateFromParamsSchema } from './schemas';
import { Game, InitialState, ParsedParams, Resolution, ScreenData, ScreenLocation } from './types';

export const updateScreenData = (screen: Rnd, { width, height, x, y }: ScreenData) => {
    screen.updatePosition({ x, y });
    screen.updateSize({ width, height });
};

export const getShareUrl = (
    topScreen: ScreenData,
    bottomScreen: ScreenData,
    resolution: Resolution,
    game: Game
) => {
    const params = {
        gId: game.id,
        rw: Math.round(resolution.width),
        rh: Math.round(resolution.height),
        tx: Math.round(topScreen.x),
        ty: Math.round(topScreen.y),
        tw: Math.round(topScreen.width),
        th: Math.round(topScreen.height),
        bx: Math.round(bottomScreen.x),
        by: Math.round(bottomScreen.y),
        bw: Math.round(bottomScreen.width),
        bh: Math.round(bottomScreen.height),
    } as any;

    const queryString = encodeParams(new URLSearchParams(params).toString());

    return `${window.location.origin}/generate?id=${queryString}`;
};

export const encodeParams = (data: string) => {
    return Buffer.from(data).toString('base64');
};

export const decodeParams = (data: string): string => {
    return Buffer.from(data, 'base64').toString('ascii');
};

export const getDefaultResolution = (): Resolution => {
    // This is could be 1, or it could be more for high density pixel displays.
    // Rounding to the nearest 0.5 is a decent guess.
    const pixelRatio = Math.round(window.devicePixelRatio * 2) / 2;

    return {
        width: window.screen.width * pixelRatio,
        height: window.screen.height * pixelRatio,
    };
};

export const getDefaultScreenData = (
    resolution: Resolution
): { [key in ScreenLocation]: ScreenData } => {
    return resolution.width >= resolution.height
        ? getHorizontalLayout(resolution)
        : getVeritcalLayout(resolution);
};

const getHorizontalLayout = (resolution: Resolution): { [key in ScreenLocation]: ScreenData } => {
    // Each screen with take up half the height of the container
    const screenHeight = resolution.height / 2;

    const topWidth = (screenHeight * SCREEN_RATIOS.top.width) / SCREEN_RATIOS.top.height;
    const bottomWidth = (screenHeight * SCREEN_RATIOS.bottom.width) / SCREEN_RATIOS.bottom.height;

    return {
        top: {
            x: (resolution.width - topWidth) / 2,
            y: 0,
            width: topWidth,
            height: screenHeight,
        },
        bottom: {
            x: (resolution.width - bottomWidth) / 2,
            y: resolution.height - screenHeight,
            width: bottomWidth,
            height: screenHeight,
        },
    };
};

const getVeritcalLayout = (resolution: Resolution): { [key in ScreenLocation]: ScreenData } => {
    const topHeight = (resolution.width * SCREEN_RATIOS.top.height) / SCREEN_RATIOS.top.width;

    const top = {
        x: 0,
        y: Math.max(resolution.height / 2 - topHeight, 0),
        width: resolution.width,
        height: topHeight,
    };

    const bottomHeight = resolution.height - topHeight - 2 * top.y;
    const bottomWidth = (bottomHeight * SCREEN_RATIOS.bottom.width) / SCREEN_RATIOS.bottom.height;

    const bottom = {
        x: (resolution.width - bottomWidth) / 2,
        y: top.y + top.height,
        width: bottomWidth,
        height: bottomHeight,
    };

    return { top, bottom };
};

export const getInitialStateFromParams = (
    searchParams: ReadonlyURLSearchParams
): InitialState | null => {
    const id = searchParams.get('id');

    if (!id) {
        return null;
    }

    // decode the id query param, which returns a query param string
    const decodedParams = decodeParams(id);

    // get ready to build a new object from the query param string
    const params: any = {};

    // @ts-ignore
    for (const [key, val] of new URLSearchParams(decodedParams).entries()) {
        params[key] = !isNaN(Number(val)) ? Number(val) : val;
    }

    // validate and return the parsed params
    const parsedParams = StateFromParamsSchema.parse(params) as ParsedParams;

    return {
        resolution: {
            width: parsedParams.rw,
            height: parsedParams.rh,
        },
        game: GAMES[parsedParams.gId],
        topScreen: {
            x: parsedParams.tx,
            y: parsedParams.ty,
            width: parsedParams.tw,
            height: parsedParams.th,
        },
        bottomScreen: {
            x: parsedParams.bx,
            y: parsedParams.by,
            width: parsedParams.bw,
            height: parsedParams.bh,
        },
    };
};

export const getDisplayValues = ({ x, y, width, height }: ScreenData) => {
    const bottom = y + height;
    const right = x + width;

    // We divide by display scale to get actual values, since we multiplied by it initially.
    return {
        x: Math.round(x),
        y: Math.round(y),
        width: Math.round(width),
        height: Math.round(height),
        top: Math.round(y),
        bottom: Math.round(bottom),
        left: Math.round(x),
        right: Math.round(right),
    };
};
