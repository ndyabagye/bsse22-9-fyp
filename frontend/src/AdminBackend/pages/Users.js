import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import BackendLayout from "../components/BackendLayout";
import Loader from "../../Shared/Loader";
import { BiUserPlus } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [openAddForm, setOpenAddForm] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [usersPerPage] = useState(10);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await axios.get("https://jsonplaceholder.typicode.com/users/");
    setUsers(res.data);
    setFilteredUsers(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    console.log("Query", query);
    if (query !== "") {
      const filtered = users.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(query.toLowerCase());
      });
      setFilteredUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  return (
    <BackendLayout title={"Users"}>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-2">
        <div className="flex justify-between items-center px-3">
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
              value={query}
              onChange={(e) => handleSearch(e)}
            />
          </div>

          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 inline-flex items-center"
            onClick={() => setOpenAddForm(true)}
            data-modal-toggle="authentication-modal"
          >
            <BiUserPlus className="w-5 h-5 mr-2" />
            Add User
          </button>
        </div>
        {/* table */}
        {loading && <Loader />}
        {!loading && (
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
                  Phone
                </th>
                <th scope="col" className="py-3 px-6">
                  Company
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key="user?.id"
                >
                  <td className="p-4 w-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-search-1" className="sr-only">
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
                      src="https://via.placeholder.com/150"
                      alt=""
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {user?.name}
                      </div>
                      <div className="font-normal text-gray-500">
                        {user?.email}
                      </div>
                    </div>
                  </th>
                  <td className="py-4 px-6">{user?.phone}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      {user?.company?.name}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {openAddForm ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-4xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-medium flex">
                    <BiUserPlus className="w-8 h-8 mr-2" />
                      Add New User</h3>
                    <button
                      type="button"
                      class="text-slate-700 border border-slate-700 hover:bg-slate-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-slate-500 dark:text-slate-500 dark:hover:text-white dark:focus:ring-slate-800"
                      onClick={() => setOpenAddForm(false)}
                    >
                      <AiOutlineClose className="h-5 w-5"/>
                      <span class="sr-only">Close Modal</span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2 flex flex-col">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          className="rounded-md text-gray-700"
                        />
                      </div>
                      {/* email */}
                      <div className="col-span-1 flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          id="email"
                          className="rounded-md text-gray-700"
                        />
                      </div>
                      {/* phone */}
                      <div className="col-span-1 flex flex-col">
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="text"
                          id="phone"
                          className="rounded-md text-gray-700"
                        />
                      </div>
                      {/* role */}
                      <div className="col-span-1 flex flex-col">
                        <label htmlFor="role">Role</label>
                        <input
                          type="text"
                          id="role"
                          className="rounded-md text-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setOpenAddForm(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setOpenAddForm(false)}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </BackendLayout>
  );
}
