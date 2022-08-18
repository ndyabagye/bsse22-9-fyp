import React from 'react'
import Layout from '../../Shared/Layout'
import Banner from '../../Shared/Banner'
import ProductCard from '../components/ProductCard'

export default function Landing() {
  return (
    <Layout>
    <div className='px-4 py-2 h-max mx-10 bg-white gap-1 border border-gray-300 rounded-sm'>
        <div id="banner" className='h-full rounded-sm py-2'>
            <Banner/>
        </div>
    </div>
    <h4 className="text-2xl font-medium px-8 mt-8">Products</h4>
    <div className="grid grid-cols-5 2xl:grid-cols-6 px-8 gap-2 2xl:gap-3 mt-4">
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    </div>
    </Layout>
  )
}
