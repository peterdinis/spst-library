import { createTRPCRouter, protectedProcedure } from "../trpc";

export const studentRouter = createTRPCRouter({
	returnUser: protectedProcedure.query(({ ctx }) => ctx.user),
});
