import { createTRPCRouter, studentProtectedProcedure } from "../trpc";

export const studentRouter = createTRPCRouter({
    get: studentProtectedProcedure.query(({ ctx }) => ctx.user),
});
