import { Buffer } from 'buffer';
import { Rnd } from 'react-rnd';
import { DISPLAY_SCALE, GAMES, SCREEN_RATIOS } from './constants';
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
        rw: resolution.width,
        rh: resolution.height,
        tx: topScreen.x,
        ty: topScreen.y,
        tw: topScreen.width,
        th: topScreen.height,
        bx: bottomScreen.x,
        by: bottomScreen.y,
        bw: bottomScreen.width,
        bh: bottomScreen.height,
    } as any;

    const queryString = encodeParams(new URLSearchParams(params).toString());

    return `${window.location.origin}?id=${queryString}`;
};

export const encodeParams = (data: string) => {
    return Buffer.from(data).toString('base64');
};

export const decodeParams = (data: string): string => {
    return Buffer.from(data, 'base64').toString('ascii');
};

export const getDefaultScreenData = (
    resolution: Resolution
): { [key in ScreenLocation]: ScreenData } => {
    return resolution.width >= resolution.height
        ? getHorizontalLayout(resolution)
        : getVeritcalLayout(resolution);
};

const getHorizontalLayout = (resolution: Resolution): { [key in ScreenLocation]: ScreenData } => {
    const scaledHeight = resolution.height * DISPLAY_SCALE;
    const scaledWidth = resolution.width * DISPLAY_SCALE;

    // Each screen with take up half the height of the container
    const screenHeight = scaledHeight / 2;

    const topWidth = (screenHeight * SCREEN_RATIOS.top.width) / SCREEN_RATIOS.top.height;
    const bottomWidth = (screenHeight * SCREEN_RATIOS.bottom.width) / SCREEN_RATIOS.bottom.height;

    return {
        top: {
            x: Math.round((scaledWidth - topWidth) / 2),
            y: 0,
            width: Math.round(topWidth),
            height: Math.round(screenHeight),
        },
        bottom: {
            x: Math.round((scaledWidth - bottomWidth) / 2),
            y: Math.round(scaledHeight - screenHeight),
            width: Math.round(bottomWidth),
            height: Math.round(screenHeight),
        },
    };
};

const getVeritcalLayout = (resolution: Resolution): { [key in ScreenLocation]: ScreenData } => {
    const scaledWidth = resolution.width * DISPLAY_SCALE;
    const scaledHeight = resolution.height * DISPLAY_SCALE;

    const topHeight = Math.round(
        (scaledWidth * SCREEN_RATIOS.top.height) / SCREEN_RATIOS.top.width
    );

    const top = {
        x: 0,
        y: Math.max(Math.round(scaledHeight / 2 - topHeight), 0),
        width: Math.round(scaledWidth),
        height: Math.round(topHeight),
    };

    const bottomHeight = scaledHeight - topHeight - 2 * top.y;
    const bottomWidth = (bottomHeight * SCREEN_RATIOS.bottom.width) / SCREEN_RATIOS.bottom.height;

    const bottom = {
        x: Math.round((scaledWidth - bottomWidth) / 2),
        y: Math.round(top.y + top.height),
        width: Math.round(bottomWidth),
        height: Math.round(bottomHeight),
    };

    return { top, bottom };
};

export const getInitialStateFromParams = (searchParams: { id?: string }): InitialState | null => {
    if (!searchParams.id) {
        return null;
    }

    // decode the id query param, which returns a query param string
    const decodedParams = decodeParams(searchParams.id);

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
