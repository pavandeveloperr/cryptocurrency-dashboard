import React, { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import selectIcon from "../assets/select-icon.svg";
import Pagination from "./Pagination";

export const SideBar = () => {
  const { cryptoData } = useContext(CryptoContext);
  const { setSortBy } = useContext(CryptoContext);

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div>
        <p className="text-md text-center mt-4 font-semibold">
          Cryptocurrency By Market Cap
        </p>
      </div>

      <label className="flex justify-end mt-2 items-center">
        <select
          name="sortby"
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded bg-gray-100 text-[14px] mr-2 pr-4 pl-2 py-0.5 capitalize focus:outline-0 cursor-pointer"
        >
          <option value="market_cap_desc">market cap desc</option>
          <option value="market_cap_asc">market cap asc</option>
          <option value="volume_desc">volume desc</option>
          <option value="volume_asc">volume asc</option>
          <option value="id_desc">id desc</option>
          <option value="id_asc">id asc</option>
          <option value="gecko_desc">gecko desc</option>
          <option value="gecko_asc">gecko asc</option>
        </select>
        <img
          src={selectIcon}
          alt="submit"
          className="w-[0.7rem] h-auto absolute 
          right-7 pointer-events-none"
        />
      </label>
      <div className="mt-4">
        {cryptoData ? (
          <table className="w-full table-auto">
            <tbody>
              {cryptoData.map((cryptoData) => {
                return (
                  <tr
                    key={cryptoData.id}
                    className="text-center text-lg border-b border-gray-100 hover:bg-gray-200 last:border-b-0"
                  >
                    <img
                      src={cryptoData.image}
                      alt={cryptoData.name}
                      className="flex absolute w-[1.1rem] h-[1.1rem] ml-3 mt-4"
                    />

                    <td className="flex flex-row pl-9 mt-2 text-[13px] font-semibold">
                      {cryptoData.name}
                    </td>

                    <div className="flex flex-row justify-end mr-5">
                      <div
                        className={`text-[12px] font-semibold ${
                          cryptoData.market_cap_change_percentage_24h > 0
                            ? "text-green-700 "
                            : "text-red-700 "
                        }`}
                      >
                        <i
                          className={`mr-1 text-xs ${
                            cryptoData.market_cap_change_percentage_24h > 0
                              ? "fa-solid fa-caret-up"
                              : "fa-solid fa-caret-down"
                          }`}
                        ></i>
                        <span>
                          {parseFloat(
                            cryptoData.market_cap_change_percentage_24h
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="-ml-9">
                      <span className="text-[11px] -mt-8 ml-5 text-gray-500 font-semibold flex pl-8 mx-4 mb-4 truncate">
                        Mkt.Cap{" "}
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "usd",
                        }).format(cryptoData.market_cap)}
                      </span>
                    </div>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>

      <Pagination />
    </div>
  );
};

export default SideBar;
