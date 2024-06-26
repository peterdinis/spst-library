import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const bookRouter = createTRPCRouter({
	fetchBooks: publicProcedure.query(async ({ ctx }) => {
		const books = await ctx.db.book.findMany({});
		return books;
	}),

	searchForBook: publicProcedure
		.input(
			z.object({
				searchTerm: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const books = await ctx.db.book.findMany({
				where: {
					name: {
						contains: input.searchTerm,
						mode: "insensitive",
					},
				},

				include: {
					category: true,
					publisher: true,
					author: true,
				},
			});

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

				include: {
					category: true,
					author: true,
					publisher: true,
				},
			});

			if (!findOneBook) {
				throw new TRPCError({
					message: "Book with this is not found",
					code: "NOT_FOUND",
				});
			}

			return findOneBook;
		}),

	paginatedBooks: publicProcedure
		.input(
			z.object({
				limit: z.number(),
				cursor: z.number().optional(),
				skip: z.number().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { limit, skip, cursor } = input;
			const items = await ctx.db.book.findMany({
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

			// Return empty array if no items are found
			return {
				items: items.length ? items : [],
				nextCursor,
			};
		}),

	createNewBook: publicProcedure
		.input(
			z.object({
				name: z.string().min(5),
				description: z.string().min(5),
				image: z.string().min(5),
				year: z.string(),
				pages: z.number(),
				isAvaiable: z.boolean(),
				categoryId: z.string(),
				authorId: z.string(),
				itemsInStock: z.number(),
				publisherId: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const newBook = await ctx.db.book.create({
				data: {
					name: input.name,
					description: input.description,
					image: input.image,
					year: input.year,
					pages: input.pages,
					isAvaiable: input.isAvaiable,
					categoryId: Number(input.categoryId),
					publisherId: Number(input.publisherId),
					authorId: Number(input.authorId),
					itemsInStock: input.itemsInStock,
				},
			});

			if (!newBook) {
				throw new TRPCError({
					message: "Could not create new book",
					code: "BAD_REQUEST",
				});
			}

			return newBook;
		}),

	updateBook: publicProcedure
		.input(
			z.object({
				id: z.number(),
				name: z.string().optional(),
				description: z.string().optional(),
				image: z.string().optional(),
				year: z.string().optional(),
				pages: z.number().optional(),
				isAvaiable: z.boolean().optional(),
				categoryId: z.number().optional(),
				authorId: z.number().optional(),
				itemsInStock: z.number().optional(),
				publisherId: z.number().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const findOneBookById = await ctx.db.book.findUnique({
				where: {
					id: input.id,
				},
			});

			if (!findOneBookById) {
				throw new TRPCError({
					message: "Book with this id does not exists",
					code: "BAD_REQUEST",
				});
			}

			const updateBook = await ctx.db.book.update({
				where: {
					id: findOneBookById.id,
				},
				data: {
					...input,
				},
			});

			if (!updateBook) {
				throw new TRPCError({
					message: "Update failed",
					code: "BAD_REQUEST",
				});
			}

			return updateBook;
		}),

	deleteBook: publicProcedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const findOneBookById = await ctx.db.book.findUnique({
				where: {
					id: input.id,
				},
				include: {
					author: true,
					category: true,
					publisher: true,
				},
			});

			if (!findOneBookById) {
				throw new TRPCError({
					message: "Book with this id does not exist",
					code: "BAD_REQUEST",
				});
			}

			if (findOneBookById.author || findOneBookById.category) {
				throw new TRPCError({
					message:
						"Cannot delete book as it is referenced by an author or category",
					code: "BAD_REQUEST",
				});
			}

			const deleteOneBook = await ctx.db.book.delete({
				where: {
					id: findOneBookById.id,
				},
			});

			if (!deleteOneBook) {
				throw new TRPCError({
					message: "Delete failed",
					code: "BAD_REQUEST",
				});
			}

			return deleteOneBook;
		}),
});
