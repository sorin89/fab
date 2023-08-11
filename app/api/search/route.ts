import { NextResponse } from 'next/server'
 
export async function GET(request: { url: string | URL; }) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')
  const response = await fetch(`https://www.omdbapi.com/?s=${q}&apikey=${process.env.API_KEY}`);
  const results = await response.json();
  return NextResponse.json(results.Search)
}