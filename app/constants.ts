import { Game, GameKey, Resolution, ResolutionKey } from './types';

export const games: { [key in GameKey]: Game } = {
    zelda: {
        id: 'zelda',
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

export const screenRatios = {
    top: {
        width: 5,
        height: 3,
    },
    bottom: {
        width: 4,
        height: 3,
    },
};

export const resolutions: { [key in ResolutionKey]: Resolution } = {
    _1280x800: {
        id: '_1280x800',
        width: 1280,
        height: 800,
        displayName: '1280 x 800 (Steam Deck)',
        aspectRatio: '16 / 10',
        displayScale: 2,
    },
    _1366x768: {
        id: '_1366x768',
        width: 1366,
        height: 768,
        displayName: '1366 x 768',
        aspectRatio: '16 / 9',
        displayScale: 2,
    },
    _1920x1080: {
        id: '_1920x1080',
        width: 1920,
        height: 1080,
        displayName: '1920 x 1080',
        aspectRatio: '16 / 9',
        displayScale: 2,
    },
    _2560x1440: {
        id: '_2560x1440',
        width: 2560,
        height: 1440,
        displayName: '2560 x 1440',
        aspectRatio: '16 / 9',
        displayScale: 2,
    },
};
