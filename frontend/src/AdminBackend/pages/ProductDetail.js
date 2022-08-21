import React from 'react'
import BackendLayout from '../components/BackendLayout'

export default function ProductDetail({product}) {
  return (
    <BackendLayout>
        <div className="grid grid-cols-3">
            <div id="image col-span-2 flex flex-col space-y-2 h-3/5"></div>
            <div id="image col-span-1 flex flex-col space-y-2">
                <div className=''>
                    <h5 className="text-xl text-gray-900">{product.name}</h5>
                    <h5 className="text-base text-gray-900">{product.price}</h5>
                </div>
                <div></div>
            </div>
        </div>
    </BackendLayout>
  )
}
