import { Rnd } from 'react-rnd';
import { ScreenData } from '../types';

export const updateScreenSizeAndPosition = (screen: Rnd, { width, height, x, y }: ScreenData) => {
    screen.updatePosition({ x, y });
    screen.updateSize({ width, height });
};
