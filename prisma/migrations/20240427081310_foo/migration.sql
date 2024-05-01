/*
  Warnings:

  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isStudent` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isTeacher` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isActive",
DROP COLUMN "isAdmin",
DROP COLUMN "isStudent",
DROP COLUMN "isTeacher",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'TEACHER';
