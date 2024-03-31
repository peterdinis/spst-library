-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "bookName" TEXT NOT NULL,
    "borrowedDays" TIMESTAMP(3) NOT NULL,
    "isBorrowed" BOOLEAN NOT NULL,
    "isReturned" BOOLEAN NOT NULL,
    "isExtended" BOOLEAN,
    "borrowerEmail" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
