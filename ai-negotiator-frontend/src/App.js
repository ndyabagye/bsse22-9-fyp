import React from 'react';
import ProductCard from './components/products/ProductCard';

function App() {
  return (
    <div className="overflow-y-hidden h-max w-full bg-gray-200 flex flex-col items-center justify-center px-2">
      <h3 className="text-green-600 font-medium text-2xl mb-2">Product Page</h3>
      <div className="grid grid-cols-4 gap-4">
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
    </div>
  );
}

export default App;