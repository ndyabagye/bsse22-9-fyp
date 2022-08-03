import React from "react";
import { Link } from "react-router-dom";
import brands from '../data/brands.json';


export default function SideBar() {
  const trimmed = brands.slice(0,10);


  return (
    <aside className="w-full h-96" aria-label="Sidebar">
      <div className="pt-4 pr-4 rounded dark:bg-gray-800">
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
        <ul className="space-y-2 h-80 overflow-y-scroll">
            {trimmed.map((brand) => (
               <li key={brand.name}>
               <Link
                  to={`/category/${brand.name}`}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
               >
                  <img src={brand.logo} alt={brand.name} className="w-6 h-6 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                  <span className="ml-3">{brand.name}</span>
               </Link>
               </li>
            ))}
        </ul>
      </div>
    </aside>
  );
}
