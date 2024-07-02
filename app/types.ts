export type AspectRatio = '16 / 9' | '16 / 10';

export type ResolutionKey = '_1280x800' | '_1366x768' | '_1920x1080' | '_2560x1440';

export type GameKey = 'zelda' | 'pkmn';

export type ScreenLocation = 'top' | 'bottom';

export type Size = {
    width: number;
    height: number;
};

export type Position = {
    x: number;
    y: number;
};

export type Game = {
    id: string;
    name: string;
    topImgSrc: string;
    bottomImgSrc: string;
};

export type ScreenData = {
    [key in ScreenLocation]: Size & Position;
};

export type Resolution = {
    id: string;
    width: number;
    height: number;
    displayName: string;
    aspectRatio: AspectRatio;
    defaultScreenData: ScreenData;
    displayScale: number;
};
