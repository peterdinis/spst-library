import { STUDENT } from "~/server/lucia/constants";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const studentRouter = createTRPCRouter({
    fetchAllStudents: publicProcedure.query(async({ctx}) => {
        const allStudents = await ctx.db.user.findMany({
            where: {
                role: STUDENT
            }
        });

        return allStudents;
    })
});
