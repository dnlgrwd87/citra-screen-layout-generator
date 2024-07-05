export type ResolutionKey = '_1280x800' | '_1366x768' | '_1920x1080' | '_2560x1440' | '_1080x2400';

export type GameKey = 'zelda' | 'pkmn';

export type ScreenLocation = 'top' | 'bottom';

export type ScreenData = Size & Position;

export type Size = {
    width: number;
    height: number;
};

export type Position = {
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
    id: string;
    width: number;
    height: number;
    displayName?: string;
};

export type ParsedParams = {
    resolutionWidth: number;
    resolutionHeight: number;
    gameId: GameKey;
    topX: number;
    topY: number;
    topWidth: number;
    topHeight: number;
    bottomX: number;
    bottomY: number;
    bottomWidth: number;
    bottomHeight: number;
};

export type InitialState = {
    resolution?: Resolution;
    game: Game;
    topScreen: ScreenData;
    bottomScreen: ScreenData;
};
