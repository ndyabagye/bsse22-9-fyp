import React ,{useState, useEffect}from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
// import brands from "../data/brands.json";

export default function SideBar() {
  const [brands, setBrands] = useState([]);
  // const trimmed = brands.slice(0, 10);

  const fetchBrands = async () => {
    const result = await axios('https://private-anon-ddcbf94e5c-carsapi1.apiary-mock.com/manufacturers');
    console.log(result);
    setBrands(result.data);
  }

  useEffect(() => {
    fetchBrands();
  });

  return (
    <aside className="w-full h-full" aria-label="Sidebar">
      <div className="pt-4">
        <Link to="/landing" className="flex items-center pl-2.5 mb-5 pb-2 border-b">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-7"
            alt="Car Shop"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Auto Car
          </span>
        </Link>
        <ul className="space-y-2 h-screen overflow-y-scroll w-full">
          {brands?.map((brand) => (
            <li key={brand.name} className="">
              <Link to={`/category/${brand.name}`}>
                <div className="flex items-center p-2 space-x-2 rounded-lg hover:bg-gray-200">
                  {/* <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  /> */}
                  <span className="ml-3 text-base font-normal text-gray-900 capitalize">{brand.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )};