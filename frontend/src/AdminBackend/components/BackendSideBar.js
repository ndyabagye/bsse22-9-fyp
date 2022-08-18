import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineHome } from "react-icons/ai";


export default function BackendSideBar() {
  return (
    <aside className="w-full h-full" aria-label="Sidebar">
      <div className="pt-4">
        <Link to="/dashboard" className="flex items-center pl-2.5 mb-5 pb-2 border-b">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-7"
            alt="Car Shop"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Auto Car Admin
          </span>
        </Link>
        <ul className="space-y-2 h-screen overflow-y-scroll w-full px-1">
          {/* home */}
          <li>
            <Link to="/dashboard">
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
            <Link to="/products">
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
            <Link to="/users">
              <div className="flex items-center p-2 space-x-6 rounded-lg hover:bg-gray-200 group">
                <AiOutlineUser className="h-8 w-8 text-gray-700 group-hover:text-gray-900" />
                <span className="ml-3 text-lg font-semibold text-gray-700 group-hover:text-gray-900 capitalize">
                  Users
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
