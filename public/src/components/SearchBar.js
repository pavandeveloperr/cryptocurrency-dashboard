import React from "react";

export const SearchBar = () => {
  return (
    <>
      <div className="flex">
        <span className="flex shadow-md">
          <select className="outline-none font-body pl-3 pr-3 rounded-lg w-[90px] md:w-[90px] sm:w-[90px] cursor-pointer">
            <option value={"USD"}>INR</option>
            <option value={"INR"}>USD</option>
          </select>
        </span>

        <form className="flex pl-5 w-full font-body">
          <div className="flex flex-grow rounded-sm shadow-lg">
            <div className="flex flex-grow items-center">
              <span className="absolute text-[13px] lg:text-[13px] sm:text-[12px] md:text-[14px] ml-6 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7c-3.868 0-7 3.132-7 7c0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
                  />
                </svg>
              </span>
              <input
                type="search"
                name="searchText"
                id="searchTextDesktop"
                required
                // value={searchQueryText}
                // onChange={(e) => setSearch(e.target.value)}
                className="flex shadow-lg focus-outlet-none focus:ring-2 invalid:bg-white-200
                     md:text-md sm:text-md w-full pl-14 py-3 pr-2 p border-gray-400 rounded-lg overflow-hidden focus-within:shadow-none outline-none sm:items-center"
                placeholder="Search by coin"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
