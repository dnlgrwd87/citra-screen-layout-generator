import { z } from 'zod';
import { games, resolutions } from '../constants';
import { ParsedParams } from '../types';

export const StateFromParamsSchema = z.object({
    gameId: z.custom<string>((val) => (
        Object.keys(games).includes(val)
    )),
    resolutionId: z.custom<string>((val) => (
        Object.keys(resolutions).includes(val)
    )),
    topX: z.number(),
    topY: z.number(),
    topWidth: z.number(),
    topHeight: z.number(),
    bottomX: z.number(),
    bottomY: z.number(),
    bottomWidth: z.number(),
    bottomHeight: z.number(),
});

export const validateParams = (params: ParsedParams): void => {
    StateFromParamsSchema.parse(params);
};
