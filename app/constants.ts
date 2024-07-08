import { Game, GameKey, Resolution } from './types';

export const DISPLAY_SCALE = 0.5;

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
