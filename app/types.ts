export type AspectRatio = '16 / 9' | '16 / 10';

export type ScreenLocation = 'top' | 'bottom';

export type Size = {
    width: number;
    height: number;
};

export type Position = {
    x: number;
    y: number;
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
    defaultScreenData?: ScreenData;
    displayScale: number;
};