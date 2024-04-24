/*
  Warnings:

  - You are about to drop the column `appRole` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "appRole",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isStudent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTeacher" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "AuthRole";
