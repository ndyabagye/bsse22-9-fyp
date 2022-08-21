import React from "react";

export default function tableLength({ rowsPerPage, title, setRowsPerPage }) {
  const handleChange = (e) => {
    setRowsPerPage(e.target.value);
  };
  return (
    <div className="flex items-center space-x-2">
      <label
        for="length"
        class="block text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Number of {title} to appear
      </label>
      <select
        id="length"
        class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={rowsPerPage}
        onChange={handleChange}
      >
        <option disabled>Select number of {title} appear</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}
