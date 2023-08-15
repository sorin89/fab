/*
  Warnings:

  - Added the required column `postersId` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "postersId" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Posters" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Posters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_postersId_fkey" FOREIGN KEY ("postersId") REFERENCES "Posters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
