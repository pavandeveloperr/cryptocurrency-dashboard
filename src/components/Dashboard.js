import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../redux/action/action";
import { CryptoChart } from "./CryptoChart";
import { ExchangeCoins } from "./ExchangeCoins";
import { SideBar } from "./SideBar";
import { Portfolio } from "./Portfolio";
import { SearchBar } from "./SearchBar";
import { useState } from "react";
import Lottie from "react-lottie";

import * as location from "../79966-bitcoin-cryptocurrency-city.json";
import * as success from "../1127-success.json";

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

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
        <div className="mt-[150px]">
          {!loading ? (
            <Lottie options={defaultOptions1} height={250} width={250} />
          ) : (
            <Lottie options={defaultOptions2} height={100} width={100} />
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
