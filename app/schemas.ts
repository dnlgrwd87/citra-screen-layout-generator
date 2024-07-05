import { z } from 'zod';
import { GAMES, RESOLUTIONS } from './constants';

export const StateFromParamsSchema = z.object({
    gameId: z.custom<string>((val) => Object.keys(GAMES).includes(val)),
    resolutionId: z.custom<string>((val) => Object.keys(RESOLUTIONS).includes(val)),
    topX: z.number(),
    topY: z.number(),
    topWidth: z.number(),
    topHeight: z.number(),
    bottomX: z.number(),
    bottomY: z.number(),
    bottomWidth: z.number(),
    bottomHeight: z.number(),
});
