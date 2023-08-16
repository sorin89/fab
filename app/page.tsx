/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from "react"
import { BiSun, BiMoon } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";
import { Button, IconButton, Input, Text, useColorMode, HStack } from '@chakra-ui/react'
import { Result, Options } from "../components"

interface Movie {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
}

export default function Home() {
  const [results, setResults] = useState<Movie[]>([])
  const [query, setQuery] = useState<string>('')
  const [view, setView] = useState<string>('list')
  const [loading, setLoading] = useState<boolean>(false)
  const { colorMode, toggleColorMode } = useColorMode()

  async function search(q: string) {
    setLoading(true)
    setQuery(q)
    const response = await fetch(`/api/search?q=${q}`);
    const results = await response.json();
    setResults(results)
    setLoading(false)
  }

  function setSearch(value: string) {
    if(value == '') setResults([])
    setQuery(value)
  }

  function sort(e:any) {
    const value = e.target.value
    if(value === "Default") {
      search(query)
    } else {
      let sortedResults = results.sort((a:any, b:any) => a[value].localeCompare(b[value]))
      setResults([...sortedResults])
    }
  }

  return (
    <main className="max-w-5xl py-10 mx-4 lg:mx-auto">
      <HStack spacing="10" className="mb-10 text-center">
        <Text fontSize="4xl" as="b" className="cursor-default">Tidybase</Text>
        <IconButton aria-label="Color mode" onClick={toggleColorMode} className="text-3xl rounded-full" icon={colorMode === 'light' ? <BiSun/> : <BiMoon/> } />
      </HStack>
      <div className="flex flex-wrap items-center">
        <Button size="sm" className="rounded-xl border mr-2 my-1" onClick={() => search('Matrix')}>Matrix</Button>
        <Button size="sm" className="rounded-xl border mr-2 my-1" onClick={() => search('Matrix Reloaded')}>Matrix Reloaded</Button>
        <Button size="sm" className="rounded-xl border mr-2 my-1" onClick={() => search('Matrix Revolutions')}>Matrix Revolutions</Button>
      </div>
      <Input 
        placeholder="🔍 search"
        type="search"
        variant="filled"
        size="md"
        value={query} 
        onChange={(e) => setSearch(e.target.value)} 
        onKeyUp={e=> e.key === "Enter" && search(query)} 
        className="mt-10"
      />
      <div>
        {loading ?
          <CgSpinner className="animate-spin text-4xl my-6 mx-auto"/>
        :
          <>
            {results && results.length != 0 &&
              <div>
                <Options 
                  results={results}
                  onClickGrid={() => setView('grid')} 
                  onClickList={() => setView('list')} 
                  onChange={sort}
                  view={view}
                  colorMode={colorMode}
                />
                <div className={`${view == 'grid' && 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}`}>
                  {results.map((r, index) => (
                    <Result r={r} key={index} view={view} colorMode={colorMode} />
                  ))}
                </div>
              </div>
            }
          </>
        }
      </div>
    </main>
  )
}
