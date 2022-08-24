import React, { useState } from "react";
import BackendLayout from "../components/BackendLayout";
import ToggleSwitch from "../../Shared/Toggle/toggle";

export default function AddProductPage() {
  const [enabled, setEnabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <BackendLayout title={"Add Product Page"}>
      <div className="flex items-center justify-center p-2 rounded-md bg-gray-200">
        <form className="w-full p-3 bg-gray-200 rounded-md" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-3">
            <div id="name" className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="slug" className="flex flex-col">
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                id="slug"
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="category" className="flex flex-col">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="brand" className="flex flex-col">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="quantity" className="flex flex-col">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                min="0"
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="sku" className="flex flex-col">
              <label htmlFor="sku">Sku</label>
              <input
                type="text"
                id="sku"
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="weight" className="flex flex-col">
              <label htmlFor="weight">Weight</label>
              <input
                type="number"
                id="weight"
                min="0"
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="price" className="flex flex-col">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                min="0"
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="salePrice" className="flex flex-col">
              <label htmlFor="salePrice">Sale Price</label>
              <input
                type="number"
                id="salePrice"
                min="0"
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="description" className="flex flex-col col-span-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 mt-2"
              ></textarea>
            </div>
            <div id="status" className="flex flex-col">
              <label htmlFor="status">Status</label>
              <div className="flex space-x-4 items-center">
                <span>Product Available?</span>
                <ToggleSwitch enabled={enabled} setEnabled={setEnabled} />
              </div>
            </div>
            <div id="image" className="flex flex-col col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                accept="image/*"
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </BackendLayout>
  );
}
