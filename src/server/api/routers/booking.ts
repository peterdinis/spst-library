import { createTRPCRouter, publicProcedure } from "../trpc";

export const bookingRouter = createTRPCRouter({
    displayAllBooking: publicProcedure.query(async({ctx}) => {
        const allBorrowedBooks = await ctx.db.booking.findMany({});
        return allBorrowedBooks;
    })
});
