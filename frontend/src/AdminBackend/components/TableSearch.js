<div className="flex justify-between items-center pb-4 bg-white p-2 dark:bg-gray-900">
<div>
  <button
    id="dropdownActionButton"
    data-dropdown-toggle="dropdownAction"
    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    type="button"
  >
    <span className="sr-only">Action button</span>
    Action
    <svg
      className="ml-2 w-3 h-3"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  </button>
  {/* Dropdown menu  */}
  <div
    id="dropdownAction"
    className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 block"
    data-popper-reference-hidden=""
    data-popper-escaped=""
    data-popper-placement="bottom"
    style={{
      position: "absolute",
      inset: "0px auto auto 0px",
      margin: "0px",
      transform: "translate(0px, 46px)",
    }}
  >
    <ul
      className="py-1 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownActionButton"
    >
      <li>
        <a
          href="#"
          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Reward
        </a>
      </li>
      <li>
        <a
          href="#"
          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Promote
        </a>
      </li>
      <li>
        <a
          href="#"
          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Activate account
        </a>
      </li>
    </ul>
    <div className="py-1">
      <a
        href="#"
        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
      >
        Delete User
      </a>
    </div>
  </div>
</div>
<label for="table-search" className="sr-only">
  Search
</label>
<div className="relative">
  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
    <svg
      className="w-5 h-5 text-gray-500 dark:text-gray-400"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clip-rule="evenodd"
      ></path>
    </svg>
  </div>
  <input
    type="text"
    id="table-search-users"
    className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Search for users"
  />
</div>
</div>