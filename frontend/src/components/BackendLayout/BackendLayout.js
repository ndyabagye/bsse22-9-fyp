import React from 'react'
import BackendSideBar from './BackendSideBar'

export default function BackendLayout({children, title}) {
  return (
    // <div className='grid grid-cols-5 gap-2 pt-2 bg-gray-200'>
    <div className='flex flex-col h-screen overflow-hidden bg-gray-100'>
      <div class="flex flex-1 overflow-hidden space-x-2">
      <div id="sidebar" className='flex w-1/5'>
        <BackendSideBar/>
      </div>
      <div id="content" className='flex flex-1 flex-col overflow-y-scroll pt-2'>
      <h5 className="text-gray-700 text-xl text-left my-1">{title}</h5>
        {children}
      </div>
    </div>
    </div>
  )
}
