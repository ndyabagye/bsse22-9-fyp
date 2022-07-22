import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleProductPage() {
  let { id } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setProducts(result.products);
      });
  }, []);

  const testId = Number(id);
  useEffect(() => {
    const singlePdt = products.filter((obj) => {
      return obj.id === testId;
    });
    setSingleProduct(singlePdt);
  }, [products, testId]);

  return (
    <div className="">
      <div className="grid grid-cols-5 gap-2 h-full w-full pb-4 border-b">
      <div
        id="sidebar"
        className="bg-white h-full flex flex-col col-span-1 p-2 mb-4"
      >
        <h3 className="text-2xl font-medium mb-3 text-green-600 text-center">
        Menu
        </h3>
        <ul>
          {products.map((cat) => (
              <li className="flex p-3 border-b hover:bg-gray-100 cursor-pointer  hover:grow">
                <p className="ml-2 text-xl font-normal">{cat.brand}</p>
              </li>
          ))}
        </ul>
      </div>

      {/* product stuff */}
      {!isLoaded ? (
        <div className="w-full h-full">
          <div className="flex items-center justify-center">Loading...</div>
        </div>
      ) : (
        // single product
        <div className="col-span-4 grid grid-cols-4 gap-x-4 h-full">
          {singleProduct.map((product, key) => (
            <>
              <div className="col-span-2 flex flex-col space-y-4">
                <p className="text-5xl font-medium">{product?.name}</p>
                <p className="text-xl text-gray-600 font-medium font-mono">
                  {product?.brand} - <span className="text-sm">{product?.category}</span>
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src={product?.thumbnail}
                    alt=""
                    className="rounded-md w-full h-72 hover:grow hover:shadow-lg object-cover"
                  />
                </div>
              </div>
              <div className="col-span-2 bg-indigo-300  w-full"></div>
            </>
          ))}
        </div>
      )}
      </div>
      <div id="related" className="h-64 mt-3">
        <p className="text-2xl font-normal ml-4">Related products</p>
      </div>
    </div>
  );
}
