import React from "react";
import { useSelector } from "react-redux";
import { Marketcap } from "./MarketCap";

export const MarketCapList = () => {

  const myData = useSelector((state) => state.default);

  console.log('my data' , myData)
  return (
    <>
      <div className="border text-start py-4 px-4 font-body bg-white rounded-lg shadow-lg">
        <h1 className="font-semibold lg:text-sm md:text-sm sm:text-lg lg:text-center sm:text-center"> Cryptocurrency by Market cap</h1>
        <ul className="py-2">
          <li className="">
            {myData.coinList.map((el , i) => {
              return (<Marketcap key={i} item={el} />)
            })}
          </li>
        </ul>
      </div>
    </>
  );
};
