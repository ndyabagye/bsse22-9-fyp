import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Shared/Layout";
import { useSelector } from "react-redux";
// import Loader from "../../Shared/Loader";
import ProductCard from "../components/ProductCard";

export default function SingleCategory() {
  const params = useParams();

  const categories = useSelector((state) => {
    const allCars = state?.cars?.cars;
    return allCars.filter((car) =>
      car.make.toLowerCase().includes(params.id.toLowerCase())
    );
  });

  console.log("Categories", categories);
  return (
    <Layout>
      <h4 className="text-2xl font-medium px-8 mt-8 capitalize">
        Category : {params.id}
      </h4>

      <div className="grid grid-cols-5 2xl:grid-cols-6 px-8 gap-2 2xl:gap-3 mt-4">
        {categories?.map((car) => {
          return <ProductCard key={car.id} car={car} />;
        })}
      </div>
    </Layout>
  );
}
