import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { fetchSingleCar } from "../../data/cars/carsSlice";

export default function ProductCard({ car }) {
  // const dispatch = useDispatch();
  // const getCar = (id) => {
  //   dispatch(fetchSingleCar(id));
  // };
  return (
    <div className="flex flex-col border shadow-sm border-gray-300 bg-white rounded-sm">
      <div className="bg-gray-200 h-36 w-full">
        <img
          src={"data:image/jpeg;base64," + car?.image}
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <Link to={`/product/${car?.id}`}>
        <div className="mt-1 px-2 cursor-pointer">
          <h6 className="text-xl">{car?.brand_id[1] ? car.brand_id[1] : ""}</h6>
          <h6 className="text-base text-gray-600">{car.year}</h6>
          <div className="text-sm text-gray-900 p-1 bg-gray-200 w-max h-10 rounded-md flex items-center justify-center mb-2">
            {car?.brand_id[1] ? car.brand_id[1] : ""}
          </div>
        </div>
      </Link>
    </div>
  );
}
