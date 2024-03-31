import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export const publisherRouter = createTRPCRouter({
    fetchPublishers: publicProcedure.query(async ({ ctx }) => {
        const publishers = await ctx.db.publisher.findMany({});
        return publishers;
    }),

    fetchPublisherById: publicProcedure
        .input(
            z.object({
                id: z.number(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const findOnePublisher = await ctx.db.publisher.findUnique({
                where: {
                    id: input.id,
                },
                include: {
                    books: true,
                },
            });

            if (!findOnePublisher) {
                throw new TRPCError({
                    message: 'Publisher with this is not found',
                    code: 'NOT_FOUND',
                });
            }

            return findOnePublisher;
        }),

    paginatedPublishers: publicProcedure
        .input(
            z.object({
                limit: z.number(),
                cursor: z.number().optional(),
                skip: z.number().optional(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { limit, skip, cursor } = input;
            const items = await ctx.db.publisher.findMany({
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

    createPublisher: publicProcedure
        .input(
            z.object({
                name: z.string().min(5),
                image: z.string().min(5),
                description: z.string().min(5),
                bossName: z.string().min(5),
                isActive: z.boolean(),
                createdDated: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const addNewPublisher = await ctx.db.publisher.create({
                data: {
                    name: input.name,
                    image: input.image,
                    description: input.description,
                    bossName: input.bossName,
                    isActive: input.isActive,
                    createdDated: input.createdDated,
                },
            });

            if (!addNewPublisher) {
                throw new TRPCError({
                    message: 'Can not created publisher',
                    code: 'BAD_REQUEST',
                });
            }

            return addNewPublisher;
        }),
});
