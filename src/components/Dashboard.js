import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../redux/action/action";
import { CryptoChart } from "./CryptoChart";
import { ExchangeCoins } from "./ExchangeCoins";
import { SideBar } from "./SideBar";
import { Portfolio } from "./Portfolio";
import { SearchBar } from "./SearchBar";
import { useState } from "react";
import Lottie from "lottie-react";

import * as bitcoin from "../79966-bitcoin-cryptocurrency-city.json";
import * as success from "../1127-success.json";


function Dashboard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.default);
  const [loading, setLoading] = useState(undefined);
  const [completed, setCompleted] = useState(undefined);


  useEffect(() => {
    setTimeout(() => {
      if (data.coinList.length === 0) {
        dispatch(fetchCoins());
      
        setLoading(true);
       
      setTimeout(() => {
        setCompleted(true);
      }, 1000); 
      }
    }, 5000);
  }, [data.coinList.length, dispatch]);

  

  return (
    <>
      {!completed ? (
        <>
        <div className="lg:w-[350px] lg:ml-[450px] lg:mt-[100px] w-[200px] mt-[150px] ml-[100px] sm:mt-[90px] sm:ml-[60px] sm:w-[40px] md:mt-[90px] md:ml-[230px] md:w-[300px]">
          {!loading ? (
            <Lottie animationData={bitcoin} />
          ) : (
            <Lottie animationData={success} />
          )}
        </div>
        </>
      ) : (
        <>
          <div className="py-4 px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="md:col-span-3 container-fluid">
                <SearchBar />
                <CryptoChart />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Portfolio />
                  <ExchangeCoins />
                </div>
              </div>
              <SideBar />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
