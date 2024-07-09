export type GameKey = 'zelda' | 'pkmn' | 'marioKart' | 'fireEmblem';

export type ScreenLocation = 'top' | 'bottom';

export type ScreenData = {
    width: number;
    height: number;
    x: number;
    y: number;
};

export type Game = {
    id: GameKey;
    name: string;
    topImgSrc: string;
    bottomImgSrc: string;
};

export type Resolution = {
    id?: string;
    width: number;
    height: number;
    displayName?: string;
};

export type ParsedParams = {
    gId: GameKey;
    rw: number;
    rh: number;
    tx: number;
    ty: number;
    tw: number;
    th: number;
    bx: number;
    by: number;
    bw: number;
    bh: number;
};

export type InitialState = {
    resolution?: Resolution;
    game: Game;
    topScreen: ScreenData;
    bottomScreen: ScreenData;
};
