import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";

export const bookingRouter = createTRPCRouter({
    displayAllBooking: publicProcedure.query(async({ctx}) => {
        const allBorrowedBooks = await ctx.db.booking.findMany({});
        return allBorrowedBooks;
    }),

    fetchBookingById: publicProcedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const findOneBooking = await ctx.db.booking.findUnique({
				where: {
					id: input.id,
				},
			});

			if (!findOneBooking) {
				throw new TRPCError({
					message: "Booking with this is not found",
					code: "NOT_FOUND",
				});
			}

			return findOneBooking;
		}),

	paginatedBoooking: publicProcedure
		.input(
			z.object({
				limit: z.number(),
				cursor: z.number().optional(),
				skip: z.number().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { limit, skip, cursor } = input;
			const items = await ctx.db.booking.findMany({
				take: limit + 1,
				cursor: cursor ? { id: cursor } : undefined,
				skip: skip,
				orderBy: {
					id: "asc",
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
