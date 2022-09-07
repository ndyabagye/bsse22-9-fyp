import React from 'react'
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
// import Header from '../../shared/Header'

export default function Layout({children}) {
  return (<>
    <main className="flex flex-col h-fit pb-2">
    <div className="flex flex-1 overflow-hidden">
      <div className="flex bg-gray-100 w-1/5 p-3">
        <SideBar/>
        </div>
      <div className="flex flex-1 flex-col">
        <Header/>
        <div className="flex flex-1 flex-col overflow-y-scroll px-4">{ children }</div>
      </div>
    </div>
  </main>
    <div className="flex">
      <Footer/>
    </div>
  </>
  )
}
