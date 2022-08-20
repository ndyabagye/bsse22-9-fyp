import React, { useEffect } from "react";

const TableFooter = ({ range, setPage, page, slice, rowsPerPage, length }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
        <>
    <div className="bg-[#f1f1f1] pl-2 w-full font-medium text-left rounded-b-2xl flex items-center justify-center space-x-4 py-3">
        <h5 className="text-sm mr-3 text-gray-600">Viewing <span className="text-lg text-gray-800">{rowsPerPage}</span> of <span className="text-lg text-gray-800">{length}</span> records</h5>

        <div className="flex space-x-2">
      {range.map((el, index) => (
          <button
          key={index}
          className={"border-none rounded-md cursor-pointer mx-1 px-5 flex items-center justify-center " + (page === el ? "text-white text-xl bg-[#185adb] " : "text-[#2c3e50] bg-slate-300" )}
          onClick={() => setPage(el)}
          >
          {el}
        </button>
      ))}
      </div>
    </div>
      </>
  );
};

export default TableFooter;