import React from 'react'
import BackendSideBar from './BackendSideBar'
import BackendHeader from './BackendHeader'

export default function BackendLayout({children, title}) {
  return (
    // <div className='grid grid-cols-5 gap-2 pt-2 bg-gray-200'>
    <div className='flex flex-col h-screen bg-gray-50'>
      <div class="flex flex-1 overflow-hidden">
      <div id="sidebar" className='flex w-1/5 bg-gray-100 border-r border-gray-700'>
        <BackendSideBar/>
      </div>
      <div id="content" className='flex flex-1 flex-col overflow-y-auto'>
       <div className="h-20 mb-3">
        <BackendHeader/>
        </div>
       <div className="ml-3 pb-3">
        <h5 className="text-gray-700 text-xl text-left my-1">{title}</h5>
         {children}
        </div>
      </div>
    </div>
    </div>
  )
}
