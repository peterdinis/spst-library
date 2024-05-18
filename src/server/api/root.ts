import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { bookRouter } from "./routers/book";
import { categoryRouter } from "./routers/category";
import { publisherRouter } from "./routers/publisher";
import { authorRouter } from "./routers/author";
import { bookingRouter } from "./routers/booking";
import { emailRouter } from "./routers/email";

export const appRouter = createTRPCRouter({
	book: bookRouter,
	category: categoryRouter,
	publisher: publisherRouter,
	author: authorRouter,
	booking: bookingRouter,
	email: emailRouter
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
