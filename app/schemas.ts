import { z } from 'zod';
import { GAMES } from './constants';

export const StateFromParamsSchema = z.object({
    gameId: z.custom<string>((val) => Object.keys(GAMES).includes(val)),
    resolutionWidth: z.number(),
    resolutionHeight: z.number(),
    topX: z.number(),
    topY: z.number(),
    topWidth: z.number(),
    topHeight: z.number(),
    bottomX: z.number(),
    bottomY: z.number(),
    bottomWidth: z.number(),
    bottomHeight: z.number(),
});
