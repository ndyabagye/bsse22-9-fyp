import React from 'react'
// import Header from '../../shared/Header'

export default function Layout({children}) {
  return (
    <>
    <div className='relative w-full flex justify-center h-max pb-6 bg-gray-200 pt-8'>
        <div className="w-full 2xl:w-3/4">{children}</div>
    </div>
    </>
  )
}
