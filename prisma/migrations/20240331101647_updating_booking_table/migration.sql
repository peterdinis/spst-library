/*
  Warnings:

  - You are about to drop the column `borrowedDays` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `from` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "borrowedDays",
ADD COLUMN     "from" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "to" TIMESTAMP(3) NOT NULL;
