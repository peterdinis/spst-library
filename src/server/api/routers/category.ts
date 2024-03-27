import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export const categoryRouter = createTRPCRouter({
    fetchCategories: publicProcedure.query(async ({ ctx }) => {
        const categories = await ctx.db.category.findMany();
        return categories;
    }),

    fetchCategoryById: publicProcedure
        .input(
            z.object({
                id: z.number(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const findOneCategory = await ctx.db.category.findUnique({
                where: {
                    id: input.id,
                },
            });

            if (!findOneCategory) {
                throw new TRPCError({
                    message: 'Category with this is not found',
                    code: 'NOT_FOUND',
                });
            }

            return findOneCategory;
        }),
});