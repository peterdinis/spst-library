import { STUDENT } from "~/server/lucia/constants";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const studentRouter = createTRPCRouter({
<<<<<<< HEAD
	fetchAllStudents: publicProcedure.query(async ({ ctx }) => {
		const allStudents = await ctx.db.user.findMany({
			where: {
				role: STUDENT,
			},
		});

		return allStudents;
	}),
=======
	get: studentProtectedProcedure.query(({ ctx }) => ctx.user),
>>>>>>> main
});
