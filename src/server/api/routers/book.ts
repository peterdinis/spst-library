import { createTRPCRouter, publicProcedure } from '../trpc';

export const bookRouter = createTRPCRouter({
    fetchBooks: publicProcedure.query(async ({ctx}) => {
        const books = await ctx.db.book.findMany({});
        return books;
    })
});