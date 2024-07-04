import { Buffer } from 'buffer';
import { Rnd } from 'react-rnd';
import { resolutions } from './constants';
import { Game, Resolution, ScreenData } from './types';

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
