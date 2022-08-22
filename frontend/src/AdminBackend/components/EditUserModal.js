import React from 'react'
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function AddUserModal({user, setOpenEditForm}) {
  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop:blur-sm">
      <div className="relative w-auto my-6 mx-auto max-w-4xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl font-medium flex">
            <FaUserEdit className="w-8 h-8 mr-2" />
              Edit User</h3>
            <button
              type="button"
              class="text-slate-700 border border-slate-700 hover:bg-slate-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-slate-500 dark:text-slate-500 dark:hover:text-white dark:focus:ring-slate-800"
              onClick={() => setOpenEditForm(false,{})}
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
                  value={user?.name}
                  id="name"
                  className="rounded-md text-gray-700"
                />
              </div>
              {/* email */}
              <div className="col-span-1 flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                value={user?.email}
                  type="text"
                  id="email"
                  className="rounded-md text-gray-700"
                />
              </div>
              {/* phone */}
              <div className="col-span-1 flex flex-col">
                <label htmlFor="phone">Phone</label>
                <input
                value={user?.phone}
                  type="text"
                  id="phone"
                  className="rounded-md text-gray-700"
                />
              </div>
              {/* role */}
              <div className="col-span-1 flex flex-col">
                <label htmlFor="role">Company</label>
                <input
                  type="text"
                  id="role"
                  value={user?.company?.name}
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
              onClick={() => setOpenEditForm(false,{})}
            >
              Close
            </button>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setOpenEditForm(false,{})}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}
