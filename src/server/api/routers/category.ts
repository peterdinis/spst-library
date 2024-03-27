import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export const categoryRouter = createTRPCRouter({
    fetchCategories: publicProcedure.query(async ({ ctx }) => {
        const categories = await ctx.db.category.findMany();
        return categories;
    }),
});
