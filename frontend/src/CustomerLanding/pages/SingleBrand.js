import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Shared/Layout";
import { useDispatch, useSelector } from "react-redux";
// import Loader from "../../Shared/Loader";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { fetchBrandProducts } from "../../data/brands/brandsSlice";
// import NotFoundSvg from '../assets/notFound.svg';
import NotFoundPng from '../assets/notFound1.png';
import Loader from "../../Shared/Loader";
export default function SingleCategory() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrandProducts(params.id));
  }, [dispatch, params]);

  const brands = useSelector((state) =>  state?.brands?.brands);
  const brandProducts = useSelector((state) => state?.brands?.brandProducts);

  const activeBrand = brands.filter(brand => Number(brand?.id) === Number(params?.id));

  console.log("brands", activeBrand);
  return (
    <Layout>
      <h4 className="text-2xl font-medium px-8 mt-8 capitalize">
        Brand : {activeBrand[0].name}
      </h4>
      {/* {brandProducts.length > 0 && (
        <div className="grid grid-cols-5 2xl:grid-cols-6 px-8 gap-2 2xl:gap-3 mt-4">
          {brandProducts?.map((car) => {
            return <ProductCard key={car.id} car={car} />;
          })}
        </div>
      )}
      {brandProducts.length === 0 && (
        <div className="w-full h-full flex flex-col space-y-4 items-center justify-center">
            <img src={NotFoundPng} className="h-40 w-40 object-cover" alt="" />
            <div className="p-8 animate-bounce rounded-lg">
            <h1 className="text-3xl">No Products under this brand yet!</h1>
            </div>
        </div>
      )} */}

{brands.loading === true && (
          <div className="flex items-center justify-center h-full col-span-5 2xl:col-span-6">
            <Loader />
          </div>
        )}
        {!brands.loading && brands?.error ? (
          <div className="flex items-center justify-center h-full w-full col-span-5 2xl:col-span-6">
            <Loader />
          </div>
        ) : null}
        {!brands.loading && brands?.length > 0 ? (
          <>
           <div className="grid grid-cols-5 2xl:grid-cols-6 px-8 gap-2 2xl:gap-3 mt-4">
          {brandProducts?.map((car) => {
            return <ProductCard key={car.id} car={car} />;
          })}
        </div>
          </>
        ) : null}
    </Layout>
  );
}
