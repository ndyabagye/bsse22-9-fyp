import React from 'react'

export default function Navbar() {
  return (
    <nav className='fixed w-full grid grid-cols-5 gap-2 bg-gray-100  shadow-md h-20 p-3 items-center'>
        <div id="logo" className='grid-cols-1 font-medium text-green-500'>BSSE22-9</div>
        <div id="logo" className='grid-cols-3 font-medium'>Nav Links</div>
        <div id="logo" className='grid-cols-1 font-medium'>Menu Stuff</div>
    </nav>
  )
}
