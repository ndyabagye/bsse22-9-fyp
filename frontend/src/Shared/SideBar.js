import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchBrands } from "../data/brands/brandsSlice";
import Loader from "./Loader";

export default function SideBar() {
  const brands = useSelector((state) => state.brands, shallowEqual);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

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
        {brands.loading && (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        )}
        {!brands.loading && brands.error ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : null}
        {!brands.loading && brands?.brands.length ? (
          <ul className="space-y-2 h-screen overflow-y-scroll w-full">
            {brands?.brands?.map((brand) => (
              <li key={brand.name} className="">
                <Link to={`/category/${brand.name}`}>
                  <div className="flex items-center p-2 space-x-2 rounded-lg hover:bg-gray-200">
                    {/* <img
                      src={brand.img_url}
                      alt=""
                      className="w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    /> */}
                    <span className="ml-3 text-base font-normal text-gray-900 capitalize">
                      {brand.name}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </aside>
  );
}
