import { Game, GameKey, Resolution, ResolutionKey } from './types';

export const DISPLAY_SCALE = 0.5;

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
    },
    _1366x768: {
        id: '_1366x768',
        width: 1366,
        height: 768,
        displayName: '1366 x 768',
    },
    _1920x1080: {
        id: '_1920x1080',
        width: 1920,
        height: 1080,
        displayName: '1920 x 1080',
    },
    _2560x1440: {
        id: '_2560x1440',
        width: 2560,
        height: 1440,
        displayName: '2560 x 1440',
    },
    // mobile, vertical
    _1080x2400: {
        id: '_1080x2400',
        width: 1080,
        height: 2400,
        displayName: '1080 x 2400',
    },
};
