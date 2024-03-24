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

        searchForBook: publicProcedure.input(z.object({
            name: z.string().min(1)
        })).query(async({ctx, input}) => {
            const findSpecificBooks = await ctx.db.book.findMany({
                where: {
                    AND: [
                        {
                            name: {
                                contains: input.name 
                            }
                        },
                    ]
                }
            });

            if(!findSpecificBooks) {
                throw new TRPCError({
                    message: "Book with these name does not exists",
                    code: "NOT_FOUND"
                })
            };

            return findSpecificBooks
        })
});
