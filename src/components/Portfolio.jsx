import React, {useState, useEffect} from 'react'
import { Chart,registerables} from 'chart.js';
import { Pie } from 'react-chartjs-2'
import numeral from 'numeral'
import ChartDataLabels from 'chartjs-plugin-datalabels'


Chart.register(...registerables);



const options = {
    responsive: true,
    plugins: {
      legend: {
        display:true,
        position: 'right',
        labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 25,
        },
      },
      title: {
        display: false,
        text: 'Chart.js Pie Chart',
      },
      datalabels: {
        display: true,
        color: 'white',
        align: 'top       ',
        position: 'chartArea',
        labels: {
            title: {
                font: {
                    weight: 'bold',
                    size: 13,
                },
            },
        },
        formatter: (dataSet1) => numeral(dataSet1).format('$0,0'),
    },
    },
  };


export const Portfolio = () => {
    // const total = () => {
    //  return {{ ZohoGetExpenses.filter(obj => obj.account_name == "Cost of Goods Sold").map(obj => obj.bcy_total).reduce((sum, obj) => sum + obj) }}
    // }
    const [data, setData] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
});

useEffect(()=> {
    const fetchData= async()=> {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tether%2Cethereum%2Cbinancecoin&order=market_cap_desc'
        const labelSet = []
        const dataSet1 = [];
      await fetch(url).then((data)=> {
          console.log("Api data", data)
          const res = data.json();
          return res
      }).then((res) => {
          console.log("ressss", res)
         for (const val of res) {
             dataSet1.push(val.current_price);
             labelSet.push(val.name)
         }
         setData({
            labels: labelSet,
            datasets: [
              {
                label: dataSet1,
                data: dataSet1,
                backgroundColor: [
                  '#0077b6',
                  '#ef476f',
                  '#00afb9',
                ],
                borderColor: [
                  'white'
                ],
                borderWidth: 0,
              },
            ],
        })
        console.log("arrData", dataSet1)
    }).catch(e => {
           console.log("error", e)
       })
   }
   fetchData();
},[])


    return (
      <>
       
      <div className='flex rounded-lg bg-white shadow-lg '>
        <div className='absolute'>
      <h1 className='flex font-semibold font-body ml-6 pl-5 mt-5 mb-4'>Portfolio</h1>
      </div>
    
       <div className='chart flex mt-4 ml-5' style={{width:'50%', height:'45%'}}>
       <Pie
                          data={data} 
                          options={options} 
                          plugins={[ChartDataLabels]} 
        />
       
       </div>
       <h5 className='mt-4 pr-5 text-gray-400'>Total Value</h5>
       </div>
      
     </>
    )
    }

