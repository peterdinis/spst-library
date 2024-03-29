import { createTRPCRouter, publicProcedure } from '../trpc';

export const publisherRouter = createTRPCRouter({
    fetchPublishers: publicProcedure.query(async ({ ctx }) => {
        const publishers = await ctx.db.publisher.findMany({});
        return publishers;
    }),
});
