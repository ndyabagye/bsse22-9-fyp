import React from 'react'

export default function ProductCard({car}) {
  console.log('car', car);
  return (
    <div className='flex flex-col border shadow-sm border-gray-300 bg-white rounded-sm cursor-pointer'>
        <div className="bg-gray-200 h-36 w-full">
            <img src={car.img_url} className='h-full w-full object-cover' alt="" />
        </div>
        <div className="mt-1 px-2">
            <h6 className="text-xl">{car.make}</h6>
            <h6 className="text-base text-gray-600">{car.year}</h6>
            <div className="text-sm font-semibold text-gray-900 px-2 py-1 bg-gray-200 w-max h-10 rounded-md flex items-center justify-center mb-2">{car.model}</div>
        </div>
    </div>
  )
}
