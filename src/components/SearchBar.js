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

        <form className="flex pl-5 w-full">
          <div className="flex flex-grow rounded-sm shadow-lg">
            <div className="flex flex-grow items-center">
              <span className="absolute text-lg sm:text-sm ml-3">
                <svg
                  class="text-slate-400 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
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
                className="flex shadow-sm focus-outlet-none focus:ring-2 invalid:bg-white-200
                     sm:text-sm block w-full pl-9  py-3 sm:text-sm pr-2 font-body border-gray-300 rounded-lg overflow-hidden focus-within:shadow-none outline-none sm:items-center"
                placeholder="Search by coin"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
