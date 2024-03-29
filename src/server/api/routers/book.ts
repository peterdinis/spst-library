import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export const bookRouter = createTRPCRouter({
    fetchBooks: publicProcedure.query(async ({ ctx }) => {
        const books = await ctx.db.book.findMany({});
        return books;
    }),

    fetchBookById: publicProcedure
        .input(
            z.object({
                id: z.number(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const findOneBook = await ctx.db.book.findUnique({
                where: {
                    id: input.id,
                },
            });

            if (!findOneBook) {
                throw new TRPCError({
                    message: 'Book with this is not found',
                    code: 'NOT_FOUND',
                });
            }

            return findOneBook;
        }),

    paginatedBooks: publicProcedure
        .input(
            z.object({
                limit: z.number(),
                cursor: z.any(),
                skip: z.number().optional(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { limit, skip, cursor } = input;
            const items = await ctx.db.book.findMany({
                take: limit + 1,
                // cursor: cursor,
                orderBy: {
                    id: 'asc',
                },
            });

            let nextCursor: typeof cursor | any = undefined;
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
