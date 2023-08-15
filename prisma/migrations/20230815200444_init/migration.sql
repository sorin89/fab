-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_postersId_fkey";

-- AlterTable
ALTER TABLE "Movies" ALTER COLUMN "postersId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_postersId_fkey" FOREIGN KEY ("postersId") REFERENCES "Posters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
