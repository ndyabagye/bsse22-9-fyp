import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Shared/Layout";
import ProductCard from "../components/ProductCard";
import { useGetBrandQuery } from "../../data/apiSlice";
// import NotFoundSvg from '../assets/notFound.svg';
import NotFoundPng from '../assets/notFound1.png';
import Loader from "../../Shared/Loader";

export default function SingleCategory() {

  const params = useParams();

  const { data: brandProducts, isFetching, isSuccess } = useGetBrandQuery(params?.id);

  // const activeBrand = brands.filter(brand => Number(brand?.id) === Number(params?.id));

  let content

if(isFetching){
  content = (<div className="h-full w-full flex items-center justify-center">
    <Loader />
  </div>)
} else if(isSuccess){
  content = brandProducts.map(car => <ProductCard key={car?.id} car={car} />)
}
  // console.log("brands", activeBrand);
  return (
    <Layout>
      <h4 className="text-2xl font-medium px-8 mt-8 capitalize">
        {/* Brand : {activeBrand[0]?.name} */}
      </h4>
          <>
           <div className="grid grid-cols-5 2xl:grid-cols-6 px-8 gap-2 2xl:gap-3 mt-4">
         {content}
        </div>
          </>
    </Layout>
  );
}
