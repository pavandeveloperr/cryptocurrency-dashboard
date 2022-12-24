import React, { useEffect, useContext, useState } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

import { Chart, registerables } from "chart.js";
import { CryptoContext } from "../context/CryptoContext";

Chart.register(...registerables);

export const CryptoChart = () => {
  const { currency, cryptoId} = useContext(CryptoContext);
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(2);
  const [id, setId] = useState("bitcoin");
  const [interval, setInterval] = useState([]);
  const [chartType, setChartType] = useState("LineChart");

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`
    ).then((response) => {
      const res = response.json();
      res.then((data) => {
        console.log("chartData", data);
        setChartData(data.prices);
      });
    });
  }, [days, id, currency]);

  const ChartData = chartData.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  function oneDay() {
    setInterval((prevInterval) => "hourly");
    setDays((prevDays) => 1);
  }
  function oneWeek() {
    setDays((prevDays) => 7);
    setInterval((prevInterval) => "daily");
  }
  function oneMonth() {
    setDays((prevDays) => 30);
    setInterval((prevInterval) => "daily");
  }
  function sixMonths() {
    setDays((prevDays) => 180);
    setInterval((prevInterval) => "monthly");
  }
  function oneYear() {
    setDays((prevDays) => 365);
    setInterval((prevInterval) => "yearly");
  }

  return (
    <div className="container-fluid w-full h-96 bg-white my-5 rounded-lg shadow-sm px-4 pt-3 lg:mt-3">
      
      <div className="flex py-0 pt-20 ml-6 mt-2 absolute text-md font-semibold">
          {currency.toUpperCase()}
        </div>
      <div className="flex lg:gap-3 absolute items-center md:ml-16 sm:ml-28 ml-16 gap-2 lg:left-30 left-4 md:mt-3">

        <button
          value={1}
          className={`px-3 py-1 ${
            days === 1 ? " border-blue-500 border text-blue-600" : ""
          } rounded-md text-xs bg-gray-100 font-semibold lg:mt-2`}
          onClick={oneDay}
        >
          1D
        </button>

        <button
          value={7}
          onClick={oneWeek}
          className={`px-3 py-1 ${
            days === 7 ? " border-blue-500 border text-blue-600" : ""
          } rounded-md text-xs bg-gray-100 font-semibold lg:mt-2`}
        >
          1W
        </button>
        <button
          value={30}
          onClick={oneMonth}
          className={`px-3 py-1 ${
            days === 30 ? " border-blue-500 border text-blue-600" : ""
          } rounded-md text-xs bg-gray-100 font-semibold lg:mt-2`}
        >
          1M
        </button>
        <button
          value={180}
          onClick={sixMonths}
          className={`px-3 py-1 ${
            days === 180 ? " border-blue-500 border text-blue-600" : ""
          } rounded-md text-xs bg-gray-100 font-semibold lg:mt-2`}
          >
          6M
        </button>
        <button
          value={365}
          onClick={oneYear}
          className={`px-3 py-1 ${
            days === 365 ? " border-blue-500 border text-blue-600" : ""
          } rounded-md text-xs bg-gray-100 font-semibold lg:mt-2`}
        >
          1Y
        </button>
        <div className="flex absolute items-center rounded-md bg-gray-100 p-2 w-24 lg:left-[32rem] lg:mt-4 md:left-[25rem] md:mt-4 sm:right-[9rem] mt-20 ml-2">
          <select
            onChange={(e) => {
              setId(e.target.value);
            }}
            className="w-full text-transform: capitalize bg-inherit outline-none"
          >
            {cryptoId &&
              Object.values(cryptoId).map((d, k) => (
                <option key={k} value={d.id} name={d.name}>
                  {d.id}
                </option>
              ))}
          </select>

          <div className="rounded-md bg-gray-100 p-2 absolute lg:left-[6rem] md:left-[6rem] left-[6rem] w-28 ml-5">
            <select
              onChange={(e) => setChartType(e.target.value)}
              className="bg-inherit outline-none w-full sm:justify-center"
            >
              <option value={`LineChart`}>Line Chart</option>
              <option value={`BarChart`}>Bar Chart</option>
              <option value={`BarChartH`}>Bar Chart Horizontal</option>
            </select>
          </div>
        </div>
      </div>

      {chartType === "LineChart" ? (
        <div className="row mx-2">
          <div className="w-full h-[300px] my-8 mt-16 px-2">
            <Line
              height={500}
              datasetIdKey="id"
              data={{
                labels: ChartData.map((val) => {
                  let date = new Date(val.x);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                      : `${date.getHours()}:${date.getMinutes()}AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    spanGaps: true,
                    id: 1,
                    borderColor: "#1AA7EC",
                    backgroundColor: "#1AA7EC",
                    pointBorderColor: "transparent",
                    pointBorderWidth: 3,
                    pointRadius: 0.2,
                    label: `${id} in ${currency}`,
                    data: ChartData.map((val) => val.y),
                  },
                ],
              }}
              options={{
                responsive: true,
                indexAxis: "x",
                tension: 0.01,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      borderDash: [6],
                      border: false,
                    },
                    ticks: {
                      source: "auto",
                      maxTicksLimit: 10,
                      font: {
                        size: "10px",
                      },
                    },
                  },
                  y: {
                    grid: {
                      border: false,
                      drawBorder: false,
                    },
                  },
                },
                plugins: {
                  tooltip: {
                    displayColors: false,
                    backgroundColor: "gray",
                  },
                  legend: {
                    display: true,
                    align : "end",
                    labels: {
                      pointStyleWidth : 15,
                      usePointStyle: true,
                      pointStyle: "circle",
                      padding: 2,
                    },
                  },
                  title: {
                    display: true,
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      ) : chartType === "BarChart" ? (
        <div className="row mx-2">
          <div
            className="w-full h-[400px] my-10 px-2 mt-16"
            style={{ height: 290 }}
          >
            <Bar
              data={{
                labels: ChartData.map((val) => {
                  let date = new Date(val.x);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                      : `${date.getHours()}:${date.getMinutes()}AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    label: `${id} in ${currency}`,
                    data: ChartData.map((val) => val.y),
                    borderColor: "#1AA7EC",
                    backgroundColor: "#1AA7EC",
                  },
                ],
              }}
              options={{
                responsive: true,
                indexAxis: "x",
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      maxTicksLimit: 20,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                    align: "end",
                      labels: {
                        pointStyleWidth : 15,
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 5,
                      },
                  },
                  title: {
                    display: true,
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="row mx-2">
          <div
            className="w-full h-[300px] my-10 px-8 mt-16"
            style={{ height: 290 }}
          >
            <Bar
              data={{
                labels: ChartData.map((val) => {
                  let date = new Date(val.x);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                      : `${date.getHours()}:${date.getMinutes()}AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    label: `${id} in ${currency}`,
                    data: ChartData.map((val) => val.y),
                    borderColor: "#1AA7EC",
                    backgroundColor: "#1AA7EC",
                  },
                ],
              }}
              options={{
                indexAxis: "y",
                elements: {
                  bar: {
                    borderWidth: 2,
                  },
                },
                responsive: true,
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                },
                plugins: {
                    legend: {
                      display: true,
                      align: "end",
                      labels: {
                        pointStyleWidth : 15,
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 4,
                      },
                  },
                  title: {
                    display: true,
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
