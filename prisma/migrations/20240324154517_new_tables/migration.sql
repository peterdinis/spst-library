-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "categoryNmae" TEXT NOT NULL DEFAULT 'ABC';

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deathYear" TEXT,
    "birthYear" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "litPeriod" TEXT NOT NULL,
    "totalBooks" INTEGER NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);
