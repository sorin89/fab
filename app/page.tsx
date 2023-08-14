'use client'
import { useState } from "react"
import { FaImdb } from "react-icons/fa";
import { BiSun, BiMoon, BiSortAlt2 } from "react-icons/bi";
import { PiClockDuotone } from "react-icons/pi";
import { HiViewList, HiViewGrid } from "react-icons/hi";
import { Button, IconButton, ButtonGroup, Input, Stack, Text, useColorMode, HStack, Box, Flex, Select } from '@chakra-ui/react'
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
  const [view, setView] = useState<string>('list')

  async function search(q: string) {
    setQuery(q)
    const response = await fetch(`/api/search?q=${q}`);
    const results = await response.json();
    setResults(results)
  }

  function setSearch(value: string) {
    if(value == '') setResults([])
    setQuery(value)
  }

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <main className="max-w-5xl py-20 mx-4 lg:mx-auto">
      <HStack spacing="10" className="mb-10">
        <Text fontSize="4xl" as="b">Tidybase</Text>
        <Button onClick={toggleColorMode} className="text-3xl">
          {colorMode === 'light' ? <BiSun/> : <BiMoon/> }
        </Button>
      </HStack>
      <Stack spacing={4} direction='row' className="items-center">
        <Text>Examples:</Text>
        <Button variant="solid" className="rounded-xl border border-gray-400" onClick={() => search('Matrix')}>Matrix</Button>
        <Button className="rounded-xl border border-gray-400" onClick={() => search('Matrix Reloaded')}>Matrix Reloaded</Button>
        <Button className="rounded-xl border border-gray-400" onClick={() => search('Matrix Revolutions')}>Matrix Revolutions</Button>
      </Stack>
      <Input 
        placeholder="🔍 search"
        type="search"
        size="md"
        value={query} 
        onChange={(e) => setSearch(e.target.value)} 
        onKeyUp={e=> e.key === "Enter" && search(query)} 
        className="my-10"
      />
      <div>
        {results && results.length != 0 &&
          <div>
            <Box className="rounded-xl">
              <Flex>
                <Box bg={colorMode === 'light' ? 'gray.200' : 'gray.700' } flex="1" className="p-4 rounded-l-xl">{results.length} results</Box>
                <Box bg={colorMode === 'light' ? 'gray.200' : 'gray.700' } className="p-4">
                  <HStack>
                    <Select icon={<BiSortAlt2/>}>
                      <option>Default</option>
                      <option>Title (A&raquo;Z)</option>
                      <option>Year</option>
                      <option>Type</option>
                    </Select>
                  </HStack>
                </Box>
                <Box  bg={colorMode === 'light' ? 'gray.200' : 'gray.700' } className="p-4 rounded-r-xl">
                  <ButtonGroup isAttached variant="outline">
                    <IconButton isActive={view == 'list'} onClick={() => setView('list')} aria-label='List view' icon={<HiViewList/>} />
                    <IconButton isActive={view == 'grid'} onClick={() => setView('grid')} aria-label='Grid View' icon={<HiViewGrid/>} />
                  </ButtonGroup>
                </Box>
              </Flex>
            </Box>
            {results.map((r, index) => (
              <div key={index}>
                <div className={`my-2 flex items-center p-2 rounded-md cursor-pointer ${colorMode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700' }`}>
                  <img src={`${r.Poster != 'N/A' ? r.Poster : 'poster.png'}`} className="w-10 h-12 rounded-lg mr-2 border border-gray-400" alt={`Poster for ${r.Title}`} />
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
        }
      </div>
    </main>
  )
}
