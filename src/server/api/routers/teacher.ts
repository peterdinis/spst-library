import { createTRPCRouter, protectedProcedure } from "../trpc";

export const teacherRouter = createTRPCRouter({
    get: protectedProcedure.query(({ ctx }) => ctx.user),
});
