import { createTRPCRouter, publicProcedure } from '../trpc';

export const authorRouter = createTRPCRouter({
    fetchAuthors: publicProcedure.query(async ({ ctx }) => {
        const authors = await ctx.db.author.findMany({});
        return authors;
    }),
});
