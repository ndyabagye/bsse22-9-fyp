import Search from "./search";

export default function Header() {
  return (
    <div className="flex px-4 space-x-3 justify-between h-20 w-full border-b shadow-md bg-gray-300 backdrop-blur-sm mb-4">
                <div className="flex w-3/5 items-center">
          <Search />
                </div>
                {/* <div className="col-span-4 flex items-center justify-end">
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
                </div> */}
        </div>
  );
}
