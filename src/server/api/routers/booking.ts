import { TRPCError } from "@trpc/server";
import { isBefore, parseISO } from "date-fns";
import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const bookingRouter = createTRPCRouter({
	displayAllBooking: publicProcedure.query(async ({ ctx }) => {
		const allBorrowedBooks = await ctx.db.booking.findMany({});
		return allBorrowedBooks;
	}),

	displayingMyBooking: publicProcedure
		.input(
			z.object({
				userEmail: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const allMyBooks = await ctx.db.booking.findMany({
				where: {
					userEmail: input.userEmail,
				},
			});

			if (!allMyBooks) {
				throw new TRPCError({
					message: "Žiadne požičané knihy",
					code: "NOT_FOUND",
				});
			}

			return allMyBooks;
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
				userEmail: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { limit, skip, cursor, userEmail } = input;
			const items = await ctx.db.booking.findMany({
				take: limit + 1,
				where: {
					userEmail,
				},
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
				items: items.length ? items : [],
				nextCursor,
			};
		}),

	createBooking: publicProcedure
		.input(
			z.object({
				bookName: z.string(),
				from: z.date(),
				to: z.date(),
				userEmail: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const currentDate = new Date();
			if (
				isBefore(parseISO(input.from as unknown as string), currentDate)
			) {
				throw new TRPCError({
					message: "Booking start date cannot be in the past",
					code: "BAD_REQUEST",
				});
			}

			const findOneBook = await ctx.db.book.findFirst({
				where: {
					name: input.bookName,
					AND: {
						NOT: {
							isAvaiable: false,
						},
					},
				},
			});

			if (!findOneBook) {
				throw new TRPCError({
					message: "Can not borrowed book",
					code: "FORBIDDEN",
				});
			}

			const borrowedSpecificBook = await ctx.db.booking.create({
				data: {
					userEmail: input.userEmail,
					bookName: findOneBook.name,
					from: input.from,
					to: input.to,
					isBorrowed: true,
					isReturned: false,
					isExtended: false,
				},
			});

			await ctx.db.book.update({
				where: {
					id: findOneBook.id,
				},
				data: {
					isAvaiable: false,
				},
			});

			if (!borrowedSpecificBook) {
				throw new TRPCError({
					message: "Something went wrong",
					code: "BAD_REQUEST",
				});
			}

			return borrowedSpecificBook;
		}),

	returnBooking: publicProcedure
		.input(
			z.object({
				bookName: z.string(),
				returnDate: z.date(),
				userEmail: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const findBookToReturn = await ctx.db.booking.findFirst({
				where: {
					bookName: input.bookName,
					userEmail: input.userEmail,
				},
			});

			if (!findBookToReturn) {
				throw new TRPCError({
					message: "Booking not found",
					code: "NOT_FOUND",
				});
			}

			const bookingFrom = findBookToReturn.from;

			if (
				isBefore(
					parseISO(input.returnDate as unknown as string),
					bookingFrom,
				)
			) {
				throw new TRPCError({
					message:
						"Return date cannot be earlier than booking start date",
					code: "BAD_REQUEST",
				});
			}

			const removeBookFromUserBooking = await ctx.db.booking.delete({
				where: {
					id: findBookToReturn.id,
					AND: {
						userEmail: input.userEmail,
					},
				},
			});

			if (!removeBookFromUserBooking) {
				throw new TRPCError({
					message: "Failed to remove booking",
					code: "BAD_REQUEST",
				});
			}

			await ctx.db.book.update({
				where: {
					id: findBookToReturn.id,
				},
				data: {
					isAvaiable: true,
				},
			});

			return { success: true };
		}),
});
