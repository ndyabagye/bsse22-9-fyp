import React from "react";
import Layout from "../../Shared/Layout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SingleProduct() {
  const params = useParams();

  const singleProduct = useSelector((state) => {
    const allCars = state?.cars?.cars;
    console.log("params", params.id);
    return allCars.find((car) => Number(car.id) === Number(params.id));
  });

  console.log("Single Product", singleProduct);

  return (
    <Layout>
      <div className="w-full h-full">
        <div className="grid grid-cols-3 gap-2 bg-green-400 p-2">
          <div id="image" className="col-span-1 ">
            <img src={singleProduct.img_url} className="h-full w-full object-cover rounded-md" alt="" />
          </div>
          <div id="details" className="col-span-2 bg-red-400 flex justify-start p-2">
            <div className="flex flex-col">
              <h3 className="text-center text-gray-700 font-semibold">{singleProduct.make}</h3>
            </div>
          </div>
        </div>
        <div id="negotiation" className="flex">

        </div>
      </div>
    </Layout>
  );
}
