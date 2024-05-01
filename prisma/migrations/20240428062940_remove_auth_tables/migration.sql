/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AdminSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminSession" DROP CONSTRAINT "AdminSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "StudentSession" DROP CONSTRAINT "StudentSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherSession" DROP CONSTRAINT "TeacherSession_userId_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "AdminSession";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "StudentSession";

-- DropTable
DROP TABLE "Teacher";

-- DropTable
DROP TABLE "TeacherSession";
