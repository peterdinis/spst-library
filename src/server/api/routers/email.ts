import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Resend } from "resend";
import { z } from "zod";
import EmailTemplate from "~/app/_components/shared/EmailTemplate";

export const emailRouter = createTRPCRouter({
  sendEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
        subject: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const resend = new Resend(
        process.env.NEXT_PUBLIC_RESEND_URL as unknown as string
      );

      const { data, error } = await resend.emails.send({
        from: "admin.spstkniznica.sk",
        to: input.email,
        subject: input.subject,
        react: EmailTemplate({
          email: input.email,
          subject: input.subject,
        }),
      });

      if (error) {
        throw new TRPCError({
          message: "Email was not send",
          code: "BAD_REQUEST",
        });
      }

      return {
        data,
        message: "Email was send successfully"
      }
    }),
});
