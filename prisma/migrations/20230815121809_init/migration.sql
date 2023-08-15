/*
  Warnings:

  - A unique constraint covering the columns `[imdbID]` on the table `Movies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movies_imdbID_key" ON "Movies"("imdbID");
