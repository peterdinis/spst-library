import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { bookRouter } from "./routers/book";

export const appRouter = createTRPCRouter({
  book: bookRouter
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
