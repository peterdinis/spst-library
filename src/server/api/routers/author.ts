import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export const authorRouter = createTRPCRouter({
    fetchAuthors: publicProcedure.query(async ({ ctx }) => {
        const authors = await ctx.db.author.findMany({});
        return authors;
    }),

    fetchAuthorById: publicProcedure
        .input(
            z.object({
                id: z.number(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const findOneAuthor = await ctx.db.author.findUnique({
                where: {
                    id: input.id,
                },
            });

            if (!findOneAuthor) {
                throw new TRPCError({
                    message: 'Author with this is not found',
                    code: 'NOT_FOUND',
                });
            }

            return findOneAuthor;
        }),

    paginatedAuthors: publicProcedure
        .input(
            z.object({
                limit: z.number(),
                cursor: z.number().optional(),
                skip: z.number().optional(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { limit, skip, cursor } = input;
            const items = await ctx.db.author.findMany({
                take: limit + 1,
                cursor: cursor ? { id: cursor } : undefined,
                skip: skip,
                orderBy: {
                    id: 'asc',
                },
            });

            let nextCursor = undefined;
            if (items.length > limit) {
                const nextItem = items.pop();
                nextCursor = nextItem?.id;
            }
            return {
                items,
                nextCursor,
            };
        }),
});
