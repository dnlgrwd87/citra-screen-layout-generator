import { Rnd } from 'react-rnd';
import { Game, Resolution, ScreenData } from '../types';
import { Buffer } from 'buffer';

export const updateScreenSizeAndPosition = (screen: Rnd, { width, height, x, y }: ScreenData) => {
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
        resolutionId: resolution.id,
        gameId: game.id,
        topX: topScreen.x.toString(),
        topY: topScreen.y.toString(),
        topWidth: topScreen.width.toString(),
        topHeight: topScreen.height.toString(),
        bottomX: bottomScreen.x.toString(),
        bottomY: bottomScreen.y.toString(),
        bottomWidth: bottomScreen.width.toString(),
        bottomHeight: bottomScreen.height.toString(),
    };

    console.log(params);

    const queryString = new URLSearchParams(params).toString();

    return `${window.location.origin}?${queryString}`;
};

export const encodeParams = (data: any) => {
    return Buffer.from(data).toString('base64');
};

export const decodeParams = (data: any) => {
    return Buffer.from(data, 'base64').toString('ascii');
};
