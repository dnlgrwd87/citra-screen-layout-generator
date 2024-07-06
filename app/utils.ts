import { Buffer } from 'buffer';
import { Rnd } from 'react-rnd';
import { DISPLAY_SCALE, PRESET_RESOLUTIONS, SCREEN_RATIOS } from './constants';
import { Game, Resolution, ScreenData, ScreenLocation } from './types';

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
    const layoutState = {
        resolutionWidth: resolution.width,
        resolutionHeight: resolution.height,
        gameId: game.id,
        topX: topScreen.x,
        topY: topScreen.y,
        topWidth: topScreen.width,
        topHeight: topScreen.height,
        bottomX: bottomScreen.x,
        bottomY: bottomScreen.y,
        bottomWidth: bottomScreen.width,
        bottomHeight: bottomScreen.height,
    };

    const params = {
        id: encodeParams(JSON.stringify(layoutState)),
    };

    const queryString = new URLSearchParams(params).toString();

    return `${window.location.origin}?${queryString}`;
};

export const encodeParams = (data: string) => {
    return Buffer.from(data).toString('base64');
};

export const decodeParams = (data: string): string => {
    return Buffer.from(data, 'base64').toString('ascii');
};

export const getInferedResolution = (): Resolution => {
    const userScreenWidth = window.outerWidth;
    const resolutions = [...PRESET_RESOLUTIONS.sort((a, b) => a.width - b.width)];

    let targetRes = resolutions[0];
    let diff = targetRes.width;

    resolutions.forEach((res) => {
        const currentDiff = Math.abs(res.width - userScreenWidth);

        if (currentDiff < diff) {
            diff = currentDiff;
            targetRes = res;
        }
    });

    return targetRes;
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
