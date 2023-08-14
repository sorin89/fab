'use client'
import { useState } from "react"
import { FaImdb } from "react-icons/fa";
import { PiClockDuotone } from "react-icons/pi";
import { Button, ButtonGroup, Input, Stack, Text, useColorMode, HStack } from '@chakra-ui/react'
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
  const [query, setQuery] = useState<string>('')

  async function search(q: string) {
    setQuery(q)
    const response = await fetch(`/api/search?q=${q}`);
    const results = await response.json();
    setResults(results)
  }

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <main className="max-w-5xl mx-auto py-20">
      <HStack>
        <Text>Tidybase</Text>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </HStack>
      <Stack spacing={8} direction='row'>
        <Text>Examples:</Text>
        <Button className="rounded-xl border border-gray-400" onClick={() => search('Matrix')}>Matrix</Button>
        <Button className="rounded-xl border border-gray-400" onClick={() => search('Matrix Reloaded')}>Matrix Reloaded</Button>
        <Button className="rounded-xl border border-gray-400" onClick={() => search('Matrix Revolutions')}>Matrix Revolutions</Button>
      </Stack>
      <Input 
        placeholder='🔍 search' 
        size='md' value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        onKeyUp={e=> e.key === 'Enter' && search(query)} 
        className="my-10"
      />
      <div>
        {results && results.map((r, index) => (
          <div key={index}>
            <div className="my-2 flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-200 rounded-md cursor-pointer">
              <img src={`${r.Poster != 'N/A' ? r.Poster : 'poster.png'}`} className="w-10 h-10 rounded-lg mr-2 border border-gray-400" alt={`Poster for ${r.Title}`} />
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
