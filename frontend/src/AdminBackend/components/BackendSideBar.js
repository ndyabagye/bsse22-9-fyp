import React from "react";
import { Link , useLocation} from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { TbBrandSketch } from "react-icons/tb";


export default function BackendSideBar() {
  const location = useLocation();

  console.log(location.pathname);
  return (
    <aside className="w-full h-full" aria-label="Sidebar">
      <div className="pt-4 h-full bg-white relative">
        <Link to="/admin/dashboard" className="flex items-center pl-2.5 mb-5 pb-2 border-b">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-7"
            alt="Car Shop"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Auto Car Admin
          </span>
        </Link>
        <ul className="space-y-4 h-screen overflow-y-scroll w-full px-1 flex flex-col">
          {/* home */}
          <li>
            <Link to="/admin/dashboard">
              <div className="flex items-center p-2 space-x-6 rounded-lg hover:bg-gray-200 group">
                <AiOutlineHome className="h-8 w-8 text-gray-700 group-hover:text-gray-900" />
                <span className="ml-3 text-lg font-semibold text-gray-700 group-hover:text-gray-900 capitalize">
                  Home
                </span>
              </div>
            </Link>
          </li>
          {/* products */}
          <li>
            <Link to="/admin/products">
              <div className="flex items-center p-2 space-x-6 rounded-lg hover:bg-gray-200 group">
                <AiOutlineShoppingCart className="h-8 w-8 text-gray-700 group-hover:text-gray-900" />
                <span className="ml-3 text-lg font-semibold text-gray-700 group-hover:text-gray-900 capitalize">
                  Products
                </span>
              </div>
            </Link>
          </li>
          {/* users */}
          <li>
            <Link to="/admin/users">
              <div className="flex items-center p-2 space-x-6 rounded-lg hover:bg-gray-200 group">
                <AiOutlineUser className="h-8 w-8 text-gray-700 group-hover:text-gray-900" />
                <span className="ml-3 text-lg font-semibold text-gray-700 group-hover:text-gray-900 capitalize">
                  Users
                </span>
              </div>
            </Link>
          </li>
          {/* categories */}
          <li>
            <Link to="/admin/categories">
              <div className="flex items-center p-2 space-x-6 rounded-lg hover:bg-gray-200 group">
                <AiOutlineUser className="h-8 w-8 text-gray-700 group-hover:text-gray-900" />
                <span className="ml-3 text-lg font-semibold text-gray-700 group-hover:text-gray-900 capitalize">
                  Categories
                </span>
              </div>
            </Link>
          </li>
          {/* brands */}
          <li>
            <Link to="/admin/brands">
              <div className="flex items-center p-2 space-x-6 rounded-lg hover:bg-gray-200 group">
                <TbBrandSketch className="h-8 w-8 text-gray-700 group-hover:text-gray-900" />
                <span className="ml-3 text-lg font-semibold text-gray-700 group-hover:text-gray-900 capitalize">
                  Brands
                </span>
              </div>
            </Link>
          </li>
          {/* settings */}
          <li className="absolute inset-x-0 bottom-2">
            <Link to="/admin/settings">
              <div className="flex items-center p-2 space-x-6 rounded-lg hover:bg-gray-200 group">
                <FiSettings className="h-8 w-8 text-gray-700 group-hover:text-gray-900" />
                <span className="ml-3 text-lg font-semibold text-gray-700 group-hover:text-gray-900 capitalize">
                  Settings
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
