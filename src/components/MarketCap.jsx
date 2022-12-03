import React from "react";
export const Marketcap = ({item}) => {
  console.log(item)
  return (
    <div className="border-b">
      <div className="flex flex-row px-2 my-4 justify-center items-center">
        <div className="grow">
          <p className="text-sm">{item.name}</p>
          <p className="text-xs text-gray-400">MktCap ${item.market_cap}</p>
        </div>
        <div className={`text-xs ${item.market_cap_change_percentage_24h > 0 ? 'text-green-700 ' : 'text-red-700 '}`}> 
          <span className="m-1">
            <i className='fa-solid fa-caret-up'></i>
          </span>
          <span>
          {parseFloat(item.market_cap_change_percentage_24h).toFixed(2)} 
          </span>
          <span className="m-auto"> %</span>
        </div>
      </div>
    </div>
  );
};
