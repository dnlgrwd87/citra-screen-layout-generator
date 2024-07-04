import { Buffer } from 'buffer';
import { Rnd } from 'react-rnd';
import { DISPLAY_SCALE, resolutions, screenRatios } from './constants';
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
    const resList = Object.values(resolutions);
    const sortedResolutions = [...resList.sort((a, b) => a.width - b.width)];

    let targetRes = sortedResolutions[0];
    let diff = targetRes.width;

    resList.forEach((res) => {
        const currentDiff = Math.abs(res.width - userScreenWidth);
        if (currentDiff < diff) {
            diff = currentDiff;
            targetRes = resolutions[res.id];
        }
    });

    return targetRes;
};

export const getDefaultScreenData = (
    resolution: Resolution
): { [key in ScreenLocation]: ScreenData } => {
    const scaledHeight = resolution.height * DISPLAY_SCALE;
    const scaledWidth = resolution.width * DISPLAY_SCALE;
    const topHeight = scaledHeight * 0.6;
    const bottomHeight = scaledHeight * 0.4;

    const topWidth = (topHeight * screenRatios.top.width) / screenRatios.top.height;
    const bottomWidth = (bottomHeight * screenRatios.bottom.width) / screenRatios.bottom.height;

    return {
        top: {
            x: (resolution.width / 2 - topWidth) / 2,
            y: 0,
            width: topWidth,
            height: topHeight,
        },
        bottom: {
            x: (resolution.width / 2 - bottomWidth) / 2,
            y: scaledHeight - bottomHeight,
            width: bottomWidth,
            height: bottomHeight,
        },
    };
};
