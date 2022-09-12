import React from "react";
import { Link } from "react-router-dom";
import { useGetBrandsQuery } from "../data/apiSlice";
import Loader from "./Loader";

export default function SideBar() {
  const {
    data: brands,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBrandsQuery();

  let content

  if (isLoading) {
    content = ( <div className="flex items-center justify-center h-full">
    <Loader />
  </div>)
  } else if (isSuccess) {
    content = (
      <ul className="space-y-2 h-screen overflow-y-scroll w-full">
      {brands?.map((brand) => (
        <li key={brand.name} className="">
          <Link to={`/brand/${brand.id}`}>
            <div className="flex items-center p-2 space-x-2 rounded-lg hover:bg-gray-200">
              <img
                src={"data:image/jpeg;base64," + brand?.brand_logo}
                alt=""
                className="w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white rounded-full"
              />
              <span className="ml-3 text-base font-normal text-gray-900 capitalize">
                {brand.name}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
    )
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <aside className="w-full h-full" aria-label="Sidebar">
      <div className="pt-4">
        <Link to="/" className="flex items-center pl-2.5 mb-5 pb-2 border-b">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-7"
            alt="Car Shop"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Auto Car
          </span>
        </Link>
        {content}
      </div>
    </aside>
  );
}
