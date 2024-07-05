import { Buffer } from 'buffer';
import { Rnd } from 'react-rnd';
import { DISPLAY_SCALE, RESOLUTIONS, SCREEN_RATIOS } from './constants';
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
        resolutionId: resolution.id,
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
    const resList = Object.values(RESOLUTIONS);
    const sortedResolutions = [...resList.sort((a, b) => a.width - b.width)];

    let targetRes = sortedResolutions[0];
    let diff = targetRes.width;

    resList.forEach((res) => {
        const currentDiff = Math.abs(res.width - userScreenWidth);
        if (currentDiff < diff) {
            diff = currentDiff;
            targetRes = RESOLUTIONS[res.id];
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

    const x = {
        top: {
            x: (scaledWidth - topWidth) / 2,
            y: 0,
            width: topWidth,
            height: screenHeight,
        },
        bottom: {
            x: (scaledWidth - bottomWidth) / 2,
            y: scaledHeight - screenHeight,
            width: bottomWidth,
            height: screenHeight,
        },
    };

    console.log(x);

    return x;
};

const getVeritcalLayout = (resolution: Resolution): { [key in ScreenLocation]: ScreenData } => {
    const scaledWidth = resolution.width * DISPLAY_SCALE;
    const scaledHeight = resolution.height * DISPLAY_SCALE;

    const topHeight = (scaledWidth * SCREEN_RATIOS.top.height) / SCREEN_RATIOS.top.width;
    const bottomHeight = (scaledWidth * SCREEN_RATIOS.bottom.height) / SCREEN_RATIOS.bottom.width;

    return {
        top: {
            x: 0,
            y: scaledHeight / 2 - topHeight,
            width: scaledWidth,
            height: topHeight,
        },
        bottom: {
            x: 0,
            y: scaledHeight / 2,
            width: scaledWidth,
            height: bottomHeight,
        },
    };
};
