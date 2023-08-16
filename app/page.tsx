/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from "react"
import { BiSun, BiMoon, BiSortAlt2 } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";
import { HiViewList, HiViewGrid } from "react-icons/hi";
import { Button, IconButton, ButtonGroup, Input, Stack, Text, useColorMode, HStack, Box, Flex, Select } from '@chakra-ui/react'
import { Result } from "../components"
import Image from 'next/image'

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
                <Box className="rounded mt-1" bg={colorMode === 'light' ? 'gray.50' : 'gray.700' }>
                  <Flex>
                    <Box flex="1" className="flex p-2 sm:p-4 items-center text-sm">{results.length} results</Box>
                    <Box className="p-2 sm:p-4">
                      <HStack>
                        <Select icon={<BiSortAlt2/>} onChange={sort} className={`border cursor-pointer  ${colorMode === 'light' ? 'border-gray-200' : 'border-gray-500'}`}>
                          <option>Default</option>
                          <option>Title</option>
                          <option>Year</option>
                        </Select>
                      </HStack>
                    </Box>
                    <Box className="p-2 sm:p-4 rounded-r-xl">
                      <ButtonGroup isAttached variant="outline">
                        <IconButton isActive={view == 'list'} onClick={() => setView('list')} aria-label='List view' icon={<HiViewList/>} />
                        <IconButton isActive={view == 'grid'} onClick={() => setView('grid')} aria-label='Grid View' icon={<HiViewGrid/>} />
                      </ButtonGroup>
                    </Box>
                  </Flex>
                </Box>
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
