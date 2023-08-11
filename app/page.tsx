'use client'
import { useState } from "react"
import { FaImdb } from "react-icons/fa";
import { PiClockDuotone } from "react-icons/pi";
import Image from 'next/image'

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export default function Home() {
  const [results, setResults] = useState<Movie[]>([])

  async function x(q: string) {
    const response = await fetch(`/api/search?q=${q}`);
    const results = await response.json();
    setResults(results)
  }
  return (
    <main className="max-w-5xl mx-auto">
      <div className='flex flex-row items-center justify-between p-24'>
        <button className='border rounded-xl p-3' onClick={() => x('Matrix')}>Matrix</button>
        <button className='border rounded-xl p-3' onClick={() => x('Matrix Reloaded')}>Matrix Reloaded</button>
        <button className='border rounded-xl p-3' onClick={() => x('Matrix Revolutions')}>Matrix Revolutions</button>
      </div>
      <div>
        {results && results.map((r, index) => (
          <div key={index}>
            <div className="my-2 flex p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer">
              <img src={`${r.Poster}`} className="w-10 h-10 rounded mr-2" alt={`Poster for ${r.Title}`} />
              <div className="flex-grow">{r.Title}</div>
              <div className="flex-initial px-5"><PiClockDuotone /> {r.Year}</div>
              <div className="flex-initial px-5">
                <a href={`https://www.imdb.com/title/${r.imdbID}/`} target="_blank">
                  <span className="inline-block"><FaImdb /> {r.imdbID}</span>
                </a>
              </div>
              <div className="pl-4 cursor-move text-2xl text-gray-400 hover:text-gray-700 drag"><i className="bi bi-list"/></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
