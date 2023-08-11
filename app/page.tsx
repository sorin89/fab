'use client'
import Image from 'next/image'

export default function Home() {
  async function x(q: string) {
    const response = await fetch(`/api/search?q=${q}`);
    const results = await response.json();
    console.log(results)
  }
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <button className='border rounded-xl p-3' onClick={() => x('Matrix')}>Matrix</button>
      <button className='border rounded-xl p-3' onClick={() => x('Matrix Reloaded')}>Matrix Reloaded</button>
      <button className='border rounded-xl p-3' onClick={() => x('Matrix Revolutions')}>Matrix Revolutions</button>
    </main>
  )
}
