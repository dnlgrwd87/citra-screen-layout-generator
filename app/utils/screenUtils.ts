import { Rnd } from 'react-rnd';
import { Game, Resolution, ScreenData } from '../types';

export const updateScreenSizeAndPosition = (screen: Rnd, { width, height, x, y }: ScreenData) => {
    screen.updatePosition({ x, y });
    screen.updateSize({ width, height });
};

export const getShareUrl = (
    topScreen: Rnd,
    bottomScreen: Rnd,
    resolution: Resolution,
    game: Game
) => {
    const tsEl = topScreen.getSelfElement()!;
    const bsEl = bottomScreen.getSelfElement()!;
    const topPos = topScreen.getDraggablePosition();
    const bottomPos = bottomScreen.getDraggablePosition();

    const params = {
        resolutionId: resolution.id,
        gameId: game.id,
        topX: topPos.x.toString(),
        topY: topPos.y.toString(),
        topWidth: tsEl.offsetWidth.toString(),
        topHeight: tsEl.offsetHeight.toString(),
        bottomX: bottomPos.x.toString(),
        bottomY: bottomPos.y.toString(),
        bottomWidth: bsEl.offsetWidth.toString(),
        bottomHeight: bsEl.offsetHeight.toString(),
    };

    const queryString = new URLSearchParams(params).toString();

    return `${window.location.origin}?${queryString}`;
};