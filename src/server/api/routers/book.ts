import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

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
			return {
				items,
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
				categoryId: z.number(),
				authorId: z.number(),
				itemsInStock: z.number(),
				publisherId: z.number(),
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
					categoryId: input.categoryId,
					publisherId: input.publisherId,
					authorId: input.authorId,
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
						id: input.id
					}
				})

				if(!findOneBookById) {
					throw new TRPCError({
						message: "Book with this id does not exists",
						code: "BAD_REQUEST",
					});
				}

				const updateBook =await ctx.db.book.update({
					where: {
						id: findOneBookById.id
					},
					data: {
						...input
					}
				})

				if(!updateBook){
					throw new TRPCError({
						message: "Update failed",
						code: "BAD_REQUEST",
					});
				}

				return updateBook;
			}),
});
