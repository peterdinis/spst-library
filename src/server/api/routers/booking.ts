import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";
import { format } from "date-fns";

export const bookingRouter = createTRPCRouter({
	displayAllBooking: publicProcedure.query(async ({ ctx }) => {
		const allBorrowedBooks = await ctx.db.booking.findMany({});
		return allBorrowedBooks;
	}),

	displayingMyBooking: publicProcedure.input(z.object({
		borrowerEmail: z.string()
	})).query(async({ctx, input}) => {
		const allMyBooks = await ctx.db.booking.findMany({
			where: {
				borrowerEmail: input.borrowerEmail
			}
		});

		if(!allMyBooks) {
			throw new TRPCError({
				message: "Žiadne požičané knihy",
				code: "NOT_FOUND"
			})
		};

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

	createBooking: publicProcedure
		.input(
			z.object({
				bookName: z.string(),
				from: z.date(),
				to: z.date(),
				borrowerEmail: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
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
					borrowerEmail: input.borrowerEmail,
					bookName: findOneBook.name,
					from: format(input.from, "dd-MM-yyyy"),
					to: format(input.to, "dd-MM-yyyy"),
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

	// TODO: This bug must be fixed later 
	/* returnBooking: publicProcedure
		.input(
			z.object({
				bookName: z.string(),
				from: z.date(),
				to: z.date(),
				borrowerEmail: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const findBookToReturn = await ctx.db.booking.findFirst({
				where: {
					bookName: input.bookName,
				},
			});

			const removeBookFromUserBooking = await ctx.db.user.delete({
				where: {
					id: String(findBookToReturn?.id),
				},
			});

			if (!removeBookFromUserBooking) {
				throw new TRPCError({
					message: "Book with this id does not exists in user",
					code: "BAD_REQUEST",
				});
			}

			await ctx.db.book.update({
				where: {
					id: removeBookFromUserBooking?.id as unknown as number,
				},

				data: {
					isAvaiable: true,
				},
			});
		}), */

	extendedBooking: publicProcedure
		.input(
			z.object({
				bookName: z.string(),
				to: z.date(),
				borrowerEmail: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const findBookToReturn = await ctx.db.booking.findFirst({
				where: {
					bookName: input.bookName,
				},
			});

			if (!findBookToReturn) {
				throw new TRPCError({
					message: "Book with this id does not exists in user",
					code: "BAD_REQUEST",
				});
			}

			const extendSpecificBook = await ctx.db.booking.update({
				where: {
					id: findBookToReturn.id,
				},
				data: {
					to: input.to,
				},
			});

			return extendSpecificBook;
		}),
});
