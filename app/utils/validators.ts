import { z } from 'zod';
import { games, resolutions } from '../constants';
import { StateFromParams } from '../types';

const gameIds = Object.keys(games);
const resolutionIds = Object.keys(resolutions);

const StateFromParamsSchema = z.object({
    gameId: z.custom<string>((val) => gameIds.includes(val)),
    resolutionId: z.custom<string>((val) => resolutionIds.includes(val)),
    topX: z.number(),
    topY: z.number(),
    topWidth: z.number(),
    topHeight: z.number(),
    bottomX: z.number(),
    bottomY: z.number(),
    bottomWidth: z.number(),
    bottomHeight: z.number(),
});

export const getStateFromParams = (params: { [key: string]: string }): StateFromParams => {
    const isNumeric = (val: string) => /^[+-]?\d+(\.\d+)?$/.test(val);

    let objFromParams: { [key: string]: string | number } = {};

    for (const [key, value] of Object.entries(params)) {
        objFromParams[key] = isNumeric(value) ? Number(value) : value;
    }

    return StateFromParamsSchema.parse(objFromParams) as StateFromParams;
};
