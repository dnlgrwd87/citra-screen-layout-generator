import { Game, Resolution } from './types';

export const games: { [key: string]: Game } = {
    zeldaOoT: {
        id: 'zeldaOoT',
        name: 'Zelda: OoT',
        topImgSrc: '/images/top-screen-oot.png',
        bottomImgSrc: '/images/bottom-screen-oot.png',
    },
    pkmn: {
        id: 'pkmn',
        name: 'Pokémon',
        topImgSrc: '/images/top-screen-pkmn.png',
        bottomImgSrc: '/images/bottom-screen-pkmn.png',
    },
};

export const resolutions: { [key: string]: Resolution } = {
    _1920x1080: {
        id: '_1920x1080',
        width: 1920,
        height: 1080,
        displayName: '1920 x 1080',
        aspectRatio: '16 / 9',
        displayScale: 2,
        defaultScreenData: {
            top: {
                x: 201.5,
                y: 0,
                width: 557,
                height: 334,
            },
            bottom: {
                x: 344.5,
                y: 336,
                width: 271,
                height: 204,
            },
        },
    },
    _2560x1440: {
        id: '_2560x1440',
        width: 2560,
        height: 1440,
        displayName: '2560 x 1440',
        aspectRatio: '16 / 9',
        displayScale: 2,
        defaultScreenData: {
            top: {
                x: 274.5,
                y: 0,
                width: 731,
                height: 438,
            },
            bottom: {
                x: 454,
                y: 440,
                width: 372,
                height: 280,
            },
        },
    },
    _1366x768: {
        id: '_1366x768',
        width: 1366,
        height: 768,
        displayName: '1366 x 768',
        aspectRatio: '16 / 9',
        displayScale: 2,
        defaultScreenData: {
            top: {
                x: 139,
                y: 0,
                width: 405,
                height: 243,
            },
            bottom: {
                x: 249,
                y: 245,
                width: 185,
                height: 139,
            },
        },
    },
    // Steam Deck
    _1280x800: {
        id: '_1280x800',
        width: 1280,
        height: 800,
        displayName: '1280 x 800 (Steam Deck)',
        aspectRatio: '16 / 10',
        displayScale: 2,
        defaultScreenData: {
            top: {
                x: 104.5,
                y: 0,
                width: 431,
                height: 259,
            },
            bottom: {
                x: 227.5,
                y: 261,
                width: 185,
                height: 139,
            },
        },
    },
};
