import React, { Fragment, useEffect, useState } from "react";
import BackendLayout from "../components/BackendLayout";
import ToggleSwitch from "../../Shared/Toggle/toggle";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchBrands } from "../../data/brands/brandsSlice";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

export default function AddProductPage() {
  const [enabled, setEnabled] = useState(false);
  const [brand, setBrand] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const brands = useSelector((state) => state.brands, shallowEqual);
  const [product, setProduct] = useState({
    name: "",
    brand_id: "Select Brands",
    model: "",
    description: "",
    image: "",
    base_price: "",
    mileage: "",
    profit: "",
    selling_price: "",
    transmission: "",
    vendor_id: "",
    category_id: "",
    year: "",
    status: false,
  });

  const handleChange = (event) => {
    // console.log("Product", product);
    // let { name, value } = event.target;
    // console.log("names", name);
    setProduct({ ...product, [event.target.name]: event.target.value });
    // setProduct({
    //   ...product,
    //     [name]: value,
    // });
    console.log('Product', product)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Details");
  };

  return (
    <BackendLayout title={"Add New Product Page"}>
      <div className="flex items-center justify-center p-2 rounded-md">
        <form
          className="w-4/5 p-3 bg-gray-200 rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-x-3">
            <div id="name" className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="slug" className="flex flex-col">
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={product.slug}
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="category" className="flex flex-col">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category_id"
                name="category_id"
                value={product.category_id}
                onChange={handleChange}
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="brand_id" name="brand_id" className="flex flex-col">
              <label htmlFor="brand">Brand</label>
              <Listbox value={product.brand} onChange={setProduct}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm h-12">
                    <span className="block truncate">{product.brand_id}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {brands?.brands.map((brand, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-blue-100 text-blue-900"
                                : "text-gray-900"
                            }`
                          }
                          value={product.brand_id}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {brand.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div id="quantity" className="flex flex-col">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                value={product.quantity}
                onChange={handleChange}
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="transmission" className="flex flex-col">
              <label htmlFor="transmission">Transmission</label>
              <input
                type="text"
                id="transmission"
                name="transmission"
                value={product.transmission}
                onChange={handleChange}
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="mileage" className="flex flex-col">
              <label htmlFor="mileage">Mileage {product.mileage}</label>
              <input
                type="number"
                id="mileage"
                name="mileage"
                min="0"
                value={product.mileage}
                onChange={handleChange}
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="base_price" className="flex flex-col">
              <label htmlFor="base_price">Base Price</label>
              <input
                type="number"
                id="base_price"
                name="base_price"
                min="0"
                value={product.base_price}
                onChange={handleChange}
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="salePrice" className="flex flex-col">
              <label htmlFor="salePrice">Sale Price</label>
              <input
                type="number"
                id="sale_price"
                name="sale_price"
                min="0"
                value={product.selling_price}
                onChange={handleChange}
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 h-12 mt-2"
              />
            </div>
            <div id="description" className="flex flex-col col-span-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                className="rounded-md bg-gray-100 hover:bg-gray-50 p-1 mt-2"
              ></textarea>
            </div>
            <div id="status" className="flex flex-col">
              <label htmlFor="status">Status</label>
              <div className="flex space-x-4 items-center">
                <span>Product Available?</span>
                <ToggleSwitch
                  enabled={product.status}
                  value={product.status}
                  setEnabled={setEnabled}
                  name="description"
                  onChange={handleChange}
                />
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
                name="file_input"
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
