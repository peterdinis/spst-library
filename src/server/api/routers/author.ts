import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

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
				include: {
					books: true,
				},
			});

			if (!findOneAuthor) {
				throw new TRPCError({
					message: "Author with this is not found",
					code: "NOT_FOUND",
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

	createNewAuthor: publicProcedure
		.input(
			z.object({
				name: z.string().min(5),
				deathYear: z.string().optional(),
				birthYear: z.string().min(5),
				description: z.string().min(5),
				litPeriod: z.string().min(5),
				totalBooks: z.number(),
				authorImage: z.string().min(5),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const addAuthor = await ctx.db.author.create({
				data: {
					name: input.name,
					deathYear: input.deathYear,
					birthYear: input.birthYear,
					description: input.description,
					litPeriod: input.litPeriod,
					totalBooks: input.totalBooks,
					authorImage: input.authorImage,
				},
			});

			if (!addAuthor) {
				throw new TRPCError({
					message: "Could not create author",
					code: "BAD_REQUEST",
				});
			}

			return addAuthor;
		}),
});
