import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../Shared/Loader";
import useTable from "../../hooks/useTable";
import { BiUserPlus } from "react-icons/bi";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import BackendLayout from "../components/BackendLayout";
import TableFooter from "../../Shared/TableFooter/tableFooter";
import TableLength from "../../Shared/TableLength/tableLength";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
// import { fetchBrands } from "../../data/brands/brandsSlice";
// import { useDispatch } from "react-redux";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { slice, range } = useTable(filteredProducts, page, rowsPerPage);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [ProductsPerPage] = useState(10);
  // const dispatch = useDispatch();

  const fetchProducts = async () => {
    setLoading(true);
    const res = await axios.get("https://dummyjson.com/products");
    setProducts(res.data.products);
    setFilteredProducts(res.data.products);
    setLoading(false);
    // dispatch(fetchBrands());
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (query !== "") {
      const filtered = products.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(query.toLowerCase());
      });
      setFilteredProducts(filtered);
    } else {
      fetchProducts();
    }
  };

  const handleEdit = (stat, product) => {
    setOpenEditForm(stat);
    setSelectedProduct(product);
  };
  return (
    <BackendLayout title={"Products"}>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-2">
        <div className="flex justify-between items-center px-3 pb-2">
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
              id="table-search-Products"
              className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for Products"
              value={query}
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <TableLength
            rowsPerPage={rowsPerPage}
            title="Products"
            setRowsPerPage={setRowsPerPage}
          />

          <Link to='/addProducts'>
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 inline-flex items-center"
            // onClick={() => setOpenAddForm(true)}
            data-modal-toggle="authentication-modal"
            >
            <BiUserPlus className="w-5 h-5 mr-2" />
            Add Product
          </button>
            </Link>
        </div>
        {/* table */}
        {loading && <Loader />}
        {!loading && (
          <>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Brand
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Price
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Stock
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Discount (%)
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {slice?.map((product) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={product?.id}
                  >
                    <td className="p-4 w-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          for="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={product?.thumbnail}
                        alt=""
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {product?.title}
                        </div>
                        <div className="font-normal text-gray-500">
                          {product?.category}
                        </div>
                      </div>
                    </th>
                    <td className="py-4 px-6">{product?.brand}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">{product?.price}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">{product?.stock}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        {product?.discountPercentage}
                      </div>
                    </td>
                    <td className="py-4 px-3 space-x-2 flex ">
                      {openEditForm?.status}
                      <Button
                      pill={true}
                      size='xs'
                        onClick={() => handleEdit(true, product)}
                      >
                        Edit
                      </Button>
                      <Button color='failure'
                      pill={true}
                      size='xs'
                        onClick={() => handleEdit(true, product)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TableFooter
              range={range}
              slice={slice}
              setPage={setPage}
              page={page}
              rowsPerPage={rowsPerPage}
              length={filteredProducts?.length}
            />
          </>
        )}
        {openAddForm ? (
          <AddProductModal setOpenAddForm={setOpenAddForm} />
        ) : null}
        {openEditForm ? (
          <EditProductModal
            Product={selectedProduct}
            setOpenEditForm={setOpenEditForm}
          />
        ) : null}
      </div>
    </BackendLayout>
  );
}
