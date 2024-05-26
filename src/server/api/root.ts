import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { authorRouter } from "./routers/author";
import { bookRouter } from "./routers/book";
import { bookingRouter } from "./routers/booking";
import { categoryRouter } from "./routers/category";
import { publisherRouter } from "./routers/publisher";

export const appRouter = createTRPCRouter({
	book: bookRouter,
	category: categoryRouter,
	publisher: publisherRouter,
	author: authorRouter,
	booking: bookingRouter,
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
