import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCoinList } from '../redux/action/action';
import selectIcon from "../assets/select-icon.svg";

export const ExchangeCoins = () => {
  const dispatch = useDispatch();
  const exchangeData = useSelector((state) => state.exchange);
  // console.log('coin', exchangeData);
  const [text1, settext1] = useState("");
  const [text2, settext2] = useState(1);
  const [units, setUnits] = useState([]);
  const [value1, setvalue1] = useState(1);
  const [value2, setvalue2] = useState(1);
  const coin = exchangeData.coinList.rates;

  
  useEffect(() => {
    if (exchangeData.coinList.length === 0) {
        dispatch(fetchCoinList());
    }
}, []);

  const convert = () => {
    const unit = Object.values(coin).find((unit)=>{
      return unit.value==value2
    })
    // console.log('unit',unit,'value2',value2)
    console.log("value",Object.values(coin))
    setUnits(unit.unit)
    let result = (value2 / value1) * text1;
    settext2(result);
  }

  return (
    <div className="px-4 py-4 font-body bg-white rounded-lg border border-gray-200 shadow-lg items-center">
    <h4 className="text-lg font-semibold ml-5">ExchangeCoins</h4>
    <div className="flex flex-row mt-8">
        <div className="pr-4 items-center">
            <div className="flex my-1 content-center items-center py-1 px-2">
                <p className="text-red-400 mr-3 text-xs">Sell</p>
                <select
                    onChange={(e) => setvalue1(e.target.value)}
                    className="w-[130px] h-[2rem] font-semibold rounded-lg p-1 text-gray-600 bg-gray-100 focus:ring-2 focus:outline-none px-5 inline-flex cursor-pointer"
                >
                    {coin && Object.values(coin).map((d, k) => (
                        <option key={k} value={d.value} className='py-2
                        px-4
                        font-normal
                        block
                        w-full
                        bg-white
                        text-gray-700
                        hover:bg-gray-100'>
                            {d.name}
                        </option>
                    ))}
                 
                </select>
                <img src={selectIcon} alt="selecticon" className="w-[0.7rem] h-auto relative lg:right-[0.9rem] md:right-[1rem] sm:right-[1rem] right-4 pointer-events-none" />
            </div>
                <div className="flex my-2 content-center items-center py-1 px-2">
                <p className="text-green-400 mr-3 text-xs">Buy</p>
                <select
                    onChange={(e) => setvalue2(e.target.value)}
                    className="w-[130px] h-[2rem] font-semibold rounded-lg text-gray-600 bg-gray-100 focus:ring-2 focus:outline-none px-5 items-center cursor-pointer"
                >
                    {coin && Object.values(coin).map((d, k) => (
                        <option key={k} value={d.value} className='bg-white'>
                           {d.name}
                        </option>
                    ))}
                </select>
                <img src={selectIcon} alt="selecticon" className="w-[0.7rem] h-auto relative lg:right-[0.9rem] right-[1rem] sm:right-[1rem] pointer-events-none" />
            </div>
        </div>
        <div className="-mt-2 px-3 mr-3">
            <div>
                <label className="text-xs text-gray-500">
                    Enter value
                </label>
                <div className='mr-[90px] lg:w-[90px] md:w-full sm:w-[90px] py-2'>
                <input
                    type="email"
                    name="email"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 rounded border border-gray-400 px-3 py-1 text-sm outline-none pt-2 pb-2"
                    placeholder=""
                    value={text1 || ""}
                    onChange={(e) => settext1(e.target.value)}
                />
                </div>
                <p className="mt-4 text-green-600 text-sm text-transform:capitalize">{parseFloat(text2).toFixed(2)} {units}</p>
            </div>
        </div>
    </div>
    <div className="text-center mt-4 pb-4">
        <button onClick={() => convert()} className="bg-blue-600 rounded-lg text-sm py-2 px-3 text-white hover:bg-blue-500">
            Exchange
        </button>
    </div>
</div>
  )
}

