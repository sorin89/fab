import { NextResponse } from 'next/server'
 
export async function GET() {
  const response = await fetch("https://www.omdbapi.com/?s=Matrix&apikey=720c3666");
  const results = await response.json();
  return NextResponse.json(results.Search)
}