import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
    <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin"/>
    <p className="ml-2">Loading...</p>
    </div>
  )
}
