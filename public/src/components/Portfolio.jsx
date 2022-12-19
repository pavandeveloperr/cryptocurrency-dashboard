import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import numeral from "numeral";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "right",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        // margin: 5,
      },
      // },
      // title: {
      //   display: false,
      // },
      // datalabels: {
      //   display: false,
      //   color: 'white',
      //   align: 'top',
      //   position: 'chartArea',
      //   labels: {
      //     title: {
      //       font: {
      //         weight: 'semibold',
      //         size: 13,
      //       },
    },
  },
  //   formatter: (dataSet1) => numeral(dataSet1).format('$0,0'),
  // },
  // },
};

export const Portfolio = () => {
  const [totalVolume, setTotalVolume] = useState("");
  const [data, setData] = useState({
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tether%2Cethereum%2Cbitcoin&order=market_cap_desc";
      const labelSet = [];
      const dataSet1 = [];
      await fetch(url)
        .then((data) => {
          // console.log("Api data", data)
          const res = data.json();
          return res;
        })
        .then((res) => {
          // console.log("ressss", res)
          for (const val of res) {
            dataSet1.push(val.market_cap);
            labelSet.push(val.name);
          }
          // console.log("dataset1" ,dataSet1)
          setData({
            labels: labelSet,
            datasets: [
              {
                label: dataSet1,
                data: dataSet1,
                backgroundColor: ["#0077b6", "#ef476f", "#00afb9"],
                borderColor: ["white"],
                borderWidth: 0,
                hoverOffset: 10,
                hoverBorderWidth: 4,
              },
            ],
          });
          // console.log("arrData", dataSet1)
          setTotalVolume(
            dataSet1.reduce((partialSum, a) => partialSum + a, 0).toFixed(0)
          );
        })
        .catch((e) => {
          // console.log("error", e)
        });
    };
    fetchData();
  }, []);

  return (
    <>
      {/* <div className="flex rounded-lg bg-white shadow-lg">
        <div>
          <h1 className="grow font-semibold font-body mt-3 ml-5 mb-2">
            Portfolio
          </h1>{" "}
          <div className="flex flex-col">
          <span className="grow text-sm text-gray-400 text-end">
            Total Value
          </span>
        </div>
        <div>
          <span className="text-xs font-semibold text-end text-black-900">
            ${totalVolume}
          </span>
        </div>

        </div> */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="mt-3">
          {" "}
          <span className="text-lg font-semibold pt-6 ml-8">Portfolio </span>
          <span className="text-gray-500 lg:ml-[100px] xl:ml-[160px] text-sm md:ml-[30px] sm:ml-[190px] ml-[20px]">
            Total Value
          </span>{" "}
          <span className="text-xs font-semibold"> {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "usd",
                        }).format(totalVolume)}</span>
        </div>

        <div className="xl:w-[240px] xl:h-[180px] md:w-[220px] md:h-[20px] xl:ml-[100px] md:ml-[70px] w-[230px] h-[170px] ml-[30px] -mt-[15px]">
          <Pie
            // style={{ width: '100%', height: '100%' }}
            data={data}
            options={options}
            // plugins={[ChartDataLabels]}
          />
        </div>
        <div className="mt-7"> </div>
      </div>
    </>
  );
};
