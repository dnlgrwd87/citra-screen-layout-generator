export type AspectRatio = '16 / 9' | '16 / 10';

export type Resolution = {
    id: string;
    width: number;
    height: number;
    displayName: string;
    aspectRatio: AspectRatio;
    defaultScreenData?: any;
};

export const resolutions: { [key: string]: Resolution } = {
    _1920x1080: {
        id: '_1920x1080',
        width: 1920,
        height: 1080,
        displayName: '1920 x 1080',
        aspectRatio: '16 / 9',
    },
    _2560x1440: {
        id: '_2560x1440',
        width: 2560,
        height: 1440,
        displayName: '2560 x 1440',
        aspectRatio: '16 / 9',
    },
    _1366x768: {
        id: '_1366x768',
        width: 1366,
        height: 768,
        displayName: '1366 x 768',
        aspectRatio: '16 / 9',
    },
    _1280x800: {
        id: '_1280x800',
        width: 1280,
        height: 800,
        displayName: '1280 x 800 (Steam Deck)',
        aspectRatio: '16 / 10',
    },
};
