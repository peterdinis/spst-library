import { z } from 'zod';

export const addCategorySchema = z.object({
    name: z.string().min(5),
    description: z.string().min(5),
});
