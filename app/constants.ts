import { Game, GameKey, Resolution } from './types';

// This is could be 1, or it could be more for high density pixel displays.
// Rounding to the nearest 0.5 is a decent guess.
// We only care about this value on app start up and it should not change.
export const DEVICE_PIXEL_RATIO = Math.round(window.devicePixelRatio * 2) / 2;
export const DISPLAY_SCALE = (1 / DEVICE_PIXEL_RATIO) * 0.65;

export const GAMES: { [key in GameKey]: Game } = {
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

export const SCREEN_RATIOS = {
    top: {
        width: 5,
        height: 3,
    },
    bottom: {
        width: 4,
        height: 3,
    },
};

export const PRESET_RESOLUTIONS: Resolution[] = [
    {
        id: '1280x800',
        width: 1280,
        height: 800,
        displayName: '1280 x 800 (Steam Deck)',
    },
    {
        id: '1366x768',
        width: 1366,
        height: 768,
        displayName: '1366 x 768',
    },
    {
        id: '1920x1080',
        width: 1920,
        height: 1080,
        displayName: '1920 x 1080',
    },
    {
        id: '2560x1440',
        width: 2560,
        height: 1440,
        displayName: '2560 x 1440',
    },
];
