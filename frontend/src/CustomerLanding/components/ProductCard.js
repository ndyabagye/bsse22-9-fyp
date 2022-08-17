import React from 'react'

export default function ProductCard() {
  return (
    <div className='flex flex-col border shadow-sm border-gray-400 bg-white rounded-sm '>
        <div className="bg-gray-200 h-36 w-full">
            <img src="/placeholder.jpg" className='h-full w-full' alt="" />
        </div>
        <div className="px-2">
            <h6 className="text-xl">Product Name</h6>
            <h6 className="text-base text-gray-600">Make Offer</h6>
            <h6 className="text-2xl text-gray-900">$ 43</h6>
            <div className="text-sm font-bold text-gray-900 px-2 py-1 bg-gray-200 w-max h-10 rounded-md flex items-center justify-center mb-2">2 sold</div>
        </div>
    </div>
  )
}
