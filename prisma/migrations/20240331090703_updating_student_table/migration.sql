-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "role" "AuthRole" NOT NULL DEFAULT 'STUDENT';
