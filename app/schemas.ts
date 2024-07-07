import { z } from 'zod';
import { GAMES } from './constants';

export const StateFromParamsSchema = z.object({
    gId: z.custom<string>((val) => Object.keys(GAMES).includes(val)),
    rw: z.number(),
    rh: z.number(),
    tx: z.number(),
    ty: z.number(),
    tw: z.number(),
    th: z.number(),
    bx: z.number(),
    by: z.number(),
    bw: z.number(),
    bh: z.number(),
});
