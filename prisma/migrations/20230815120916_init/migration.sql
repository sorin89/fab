-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "imdbID" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);
