/*
  Warnings:

  - You are about to drop the column `categoryNmae` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "categoryNmae",
ADD COLUMN     "categoryId" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
