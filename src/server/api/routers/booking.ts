import { TRPCError } from "@trpc/server";
import {
	createTRPCRouter,
	publicProcedure,
} from "../trpc";
import z from "zod";
import {format} from "date-fns";

export const bookingRouter = createTRPCRouter({
	displayAllBooking: publicProcedure.query(async ({ ctx }) => {
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

	createBooking: publicProcedure.input(z.object({
		bookName: z.string(),
		from: z.date(),
		to: z.date(),
		borrowerEmail: z.string()
	})).mutation(async({ctx, input}) => {
		const findOneBook = await ctx.db.book.findFirst({
			where: {
				name: input.bookName,
				AND: {
					NOT: {
						isAvaiable: false
					}
				}
			},
		});

		if(!findOneBook) {
			throw new TRPCError({
				message: "Can not borrowed book",
				code: "FORBIDDEN",
			});
		};

		const borrowedSpecificBook = await ctx.db.booking.create({
			data: {
				borrowerEmail: input.borrowerEmail,
				bookName: findOneBook.name,
				from: format(input.from, "dd-MM-yyyy"),
				to: format(input.to, "dd-MM-yyyy"),
				isBorrowed: true,
				isReturned: false,
				isExtended: false
			}
		});

		await ctx.db.book.update({
			where: {
				id: findOneBook.id
			},
			data: {
				isAvaiable: false
			}
		})


		if(!borrowedSpecificBook) {
			throw new TRPCError({
				message: "Something went wrong",
				code: "BAD_REQUEST",
			});
		}

		return borrowedSpecificBook;
	}),

	returnBooking: publicProcedure.mutation(async({ctx, input}) => {

	}),
	
	extendedBooking: publicProcedure.mutation(async({ctx, input}) => {

	}),
});
