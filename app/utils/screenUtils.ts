import { Rnd } from 'react-rnd';
import { Game, Resolution, ScreenData } from '../types';

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

    const queryString = new URLSearchParams(params).toString();

    return `${window.location.origin}?${queryString}`;
};
