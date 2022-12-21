import debounce from "lodash.debounce";
import React, { useContext, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  const { searchData, setCoinSearch, setSearchData } =
    useContext(CryptoContext);

  let handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    handleSearch(query);
  };

  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  };

  return (
    <>
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
              value={searchText}
              onChange={handleInput}
              className="flex shadow-lg focus-outlet-none focus:ring-2 invalid:bg-white-200
               md:text-md sm:text-md w-full pl-14 py-3 pr-2 p border-gray-400 rounded-lg overflow-hidden focus-within:shadow-none outline-none sm:items-center"
              placeholder="Search by coin"
            />
          </div>
        </div>
      </form>
      {searchText.length > 0 ? (
        <ul
          className="absolute top-14 -right-2 w-full h-96 rounded
overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 overflow-y-scroll
backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100
"
        >
          {searchData ? (
            searchData.map((coin) => {
              return (
                <li
                  className="flex items-center ml-4 my-2 cursor-pointer"
                  key={coin.id}
                  onClick={() => selectCoin(coin.id)}
                >
                  <img className="w-[1rem] h-[1rem] mx-1.5" src={coin.thumb} />

                  <span>{coin.id}</span>
                </li>
              );
            })
          ) : (
            <div className="w-full mt-8 flex justify-center items-center">
              <div
                className="w-8 h-8 border-4 border-gray-600 rounded-full border-b-gray-200 animate-spin"
                role="status"
              />
              <span className="ml-2">Searching...</span>
            </div>
          )}
        </ul>
      ) : null}
    </>
  );
};

export const SearchBar = () => {
  const { getSearchResult } = useContext(CryptoContext);

  const debounceFunc = debounce(function (val) {
    getSearchResult(val);
  }, 2000);

  return (
    <>
      <div className="flex">
        <span className="flex shadow-md">
          <select className="outline-none font-body pl-3 pr-3 rounded-lg w-[90px] md:w-[90px] sm:w-[90px] cursor-pointer">
            <option value={"USD"}>INR</option>
            <option value={"INR"}>USD</option>
          </select>
        </span>

        <div className="relative w-full">
          <SearchInput handleSearch={debounceFunc} />
        </div>
      </div>
    </>
  );
};
