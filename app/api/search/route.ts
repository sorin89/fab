import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient()
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')
  const response = await fetch(`https://www.omdbapi.com/?s=${q}&apikey=${process.env.API_KEY}&type=movie`);
  const results = await response.json();

  results.Search.forEach((r:any) => {
    async function addMovie(result:any) {
      const movie = await prisma.movies.findUnique({
        where: {
          imdbID: result.imdbID,
        },
      })
      if(!movie) {
        await prisma.movies.create({
          data: {
            imdbID: result.imdbID,
            title: result.Title,
            year: result.Year,
          },
        })
      }
    }
    addMovie(r)
  })

  return NextResponse.json(results.Search)
}