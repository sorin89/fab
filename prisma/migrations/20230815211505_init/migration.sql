/*
  Warnings:

  - You are about to drop the column `postersId` on the `Movies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[movieId]` on the table `Posters` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `movieId` to the `Posters` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_postersId_fkey";

-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "postersId";

-- AlterTable
ALTER TABLE "Posters" ADD COLUMN     "movieId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Posters_movieId_key" ON "Posters"("movieId");

-- AddForeignKey
ALTER TABLE "Posters" ADD CONSTRAINT "Posters_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
