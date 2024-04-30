import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure} from "../trpc";
import axios from "axios";
import * as z from "zod";

export const studentRouter = createTRPCRouter({
    registerUser: publicProcedure.input(z.object({
        name: z.string(),
        lastName: z.string(),
        email: z.string(),
        password: z.string(),
        isActive: z.boolean(),
        hasAdminRights: z.boolean(),
        role: z.string()
    })).mutation(async ({input}) => {
        const dataForStudent = {
            name: input.name,
            lastName: input.name,
            email: input.email,
            password: input.password,
            isActive: true,
            hasAdminRights: false,
            role: "STUDENT"
        }
        const createNewStudent = await axios.post(process.env.NEXT_PUBLIC_AUTH_API + "/users", dataForStudent);

        if(!createNewStudent) {
            throw new TRPCError({
                message: "Nastala chyba pri vytvorení používateľa",
                code: "BAD_REQUEST"
            })
        }

        return createNewStudent;
    }),


});
