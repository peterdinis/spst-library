import { TEACHER } from "~/server/lucia/constants";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const teacherRouter = createTRPCRouter({
	fetchAllTeachers: publicProcedure.query(async ({ ctx }) => {
		const allTeachers = await ctx.db.user.findMany({
			where: {
				role: TEACHER,
			},
		});

		return allTeachers;
	}),
});
