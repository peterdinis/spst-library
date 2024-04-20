import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
	fetchCategories: publicProcedure.query(async ({ ctx }) => {
		const categories = await ctx.db.category.findMany({
			include: {
				books: true,
			},
		});
		return categories;
	}),

	fetchCategoryById: publicProcedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const findOneCategory = await ctx.db.category.findUnique({
				where: {
					id: input.id,
				},
				include: {
					books: true,
				},
			});

			if (!findOneCategory) {
				throw new TRPCError({
					message: "Category with this is not found",
					code: "NOT_FOUND",
				});
			}

			return findOneCategory;
		}),

	createCategory: publicProcedure
		.input(
			z.object({
				name: z.string().min(5),
				description: z.string().min(5),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const addNewCategory = await ctx.db.category.create({
				data: {
					name: input.name,
					description: input.description,
				},
			});

			if (!addNewCategory) {
				throw new TRPCError({
					message: "Something went wrong",
					code: "BAD_REQUEST",
				});
			}

			return addNewCategory;
		}),

	paginatedCategories: publicProcedure
		.input(
			z.object({
				limit: z.number(),
				cursor: z.number().optional(),
				skip: z.number().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { limit, skip, cursor } = input;
			const items = await ctx.db.category.findMany({
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

	updateCategory: publicProcedure
		.input(
			z.object({
				id: z.number(),
				name: z.string().optional(),
				description: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const findOneCategory = await ctx.db.category.findUnique({
				where: {
					id: input.id,
				},
			});

			if (!findOneCategory) {
				throw new TRPCError({
					message: "Category with this is not found",
					code: "NOT_FOUND",
				});
			}

			const updateOneCategory = await ctx.db.category.update({
				where: {
					id: findOneCategory.id,
				},
				data: {
					...input,
				},
			});

			return updateOneCategory;
		}),
	deleteCategory: publicProcedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const findOneCategory = await ctx.db.category.findUnique({
				where: {
					id: input.id,
				},
			});

			if (!findOneCategory) {
				throw new TRPCError({
					message: "Category with this is not found",
					code: "NOT_FOUND",
				});
			}

			const deleteOneCategory = await ctx.db.category.delete({
				where: {
					id: findOneCategory.id,
				},
			});

			return deleteOneCategory;
		}),
});
