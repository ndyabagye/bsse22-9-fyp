import { Link } from "react-router-dom";

import Search from "../components/Header/search";

export default function Header() {
  return (
    <div className="h-20 w-full grid grid-cols-9 border-b shadow-md sticky top-0 z-50 bg-gray-100 backdrop-blur-sm">
        <div className="col-span-2 flex items-center pl-3">
      <Link to='/'>
          <img src="./logo.jpeg" alt="" className="h-16 rounded-md" />
      </Link>
        </div>
      <div className="col-span-5 flex items-center">
        <Search />
      </div>
      <div className="col-span-2 flex items-center justify-end">
        <div className="grid grid-cols-2 gap-x-2">
          <button
            type="button"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Sign In
          </button>
          <button
            type="button"
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Cart
          </button>
        </div>
      </div>
    </div>
  );
}
