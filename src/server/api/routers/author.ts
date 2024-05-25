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
      })
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
      })
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
      })
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
  updateAuthor: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        deathYear: z.string().optional(),
        birthYear: z.string().optional(),
        description: z.string().optional(),
        litPeriod: z.string().optional(),
        totalBooks: z.number().optional(),
        authorImage: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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

      const updateAuthor = await ctx.db.author.update({
        where: {
          id: findOneAuthor.id,
        },
        data: {
          ...input,
        },
      });

      return updateAuthor;
    }),

  deleteAuthor: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const findOneAuthorById = await ctx.db.author.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!findOneAuthorById) {
        throw new TRPCError({
          message: "Author with this id does not exist",
          code: "BAD_REQUEST",
        });
      }

      const booksWithAuthor = await ctx.db.book.findMany({
        where: {
          authorId: input.id,
        },
      });

      if (booksWithAuthor.length > 0) {
        throw new TRPCError({
          message: "Cannot delete author with associated books",
          code: "BAD_REQUEST",
        });
      }

      const deleteOneAuthor = await ctx.db.author.delete({
        where: {
          id: input.id,
        },
      });

      if (!deleteOneAuthor) {
        throw new TRPCError({
          message: "Delete failed",
          code: "BAD_REQUEST",
        });
      }

      return deleteOneAuthor;
    }),
});
