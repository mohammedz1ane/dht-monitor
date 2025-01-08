// src/components/TemperatureChart.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TemperatureChart = ({ data }) => {
   const [searchDay, setSearchDay] = useState(null);
     const [searchMonth, setSearchMonth] = useState(null);
    const [searchYear, setSearchYear] = useState(null);
    
    const filteredData = useMemo(() => {
       let filtered = [...data];
       const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        filtered = filtered.filter(item => new Date(item.dt) <= today);
        
        if (searchDay || searchMonth || searchYear) {
              const searchYearInt = searchYear ? parseInt(searchYear, 10) : NaN;
            const searchMonthInt = searchMonth ? parseInt(searchMonth, 10) : NaN;
            const searchDayInt = searchDay ? parseInt(searchDay, 10) : NaN;


              filtered = filtered.filter(item => {
                const itemDate = new Date(item.dt);
                const itemYear = itemDate.getFullYear();
               const itemMonth = itemDate.getMonth();
                const itemDay = itemDate.getDate();

                 if (!isNaN(searchYearInt)) {
                     if (itemYear === searchYearInt) {
                        if (!isNaN(searchMonthInt)) {
                             if (itemMonth === searchMonthInt) {
                                 if (!isNaN(searchDayInt)) {
                                   return itemDay === searchDayInt
                                 }
                                 return true
                            }
                        } else {
                           return true;
                        }
                    }
                 } else if (isNaN(searchYearInt) && !isNaN(searchDayInt))
                 {
                     if (itemYear === searchYearInt)
                      {
                        if(itemMonth === searchMonthInt )
                       {
                             if (itemDay === searchDayInt) {
                                 return true
                              }
                           }
                       }
                 }
                else if(isNaN(searchYearInt) && isNaN(searchMonthInt) && isNaN(searchDayInt)){
                      return true;
                   }
               return false
            });
        }
         return filtered
    }, [data, searchDay, searchMonth, searchYear]);

    const chartData = {
        labels: filteredData.map(item => new Date(item.dt).toLocaleTimeString()),
        datasets: [
            {
                label: 'Temperature (°C)',
                data: filteredData.map(item => item.temp),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
                pointHoverRadius: 7,
                pointHoverBackgroundColor: 'rgb(255, 99, 132)',
                pointHoverBorderColor: 'black',
                pointHoverBorderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time',
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Temperature Variation',
            },
             tooltip: {
                callbacks: {
                   label: (context) => {
                        const index = context.dataIndex;
                       const item = filteredData[index];
                        return `Temperature: ${item.temp} °C, Humidity: ${item.hum} %, Date: ${new Date(item.dt).toLocaleString()}`
                    }
                }
            }
        }
    };

      const handleDayChange = (e) => {
        setSearchDay(e.target.value);
    };
     const handleMonthChange = (e) => {
         setSearchMonth(e.target.value);
         setSearchDay(null);
    };
    const handleYearChange = (e) => {
        setSearchYear(e.target.value);
         setSearchDay(null);
   };

    const generateDayOptions = () => {
      const daysInMonth = searchMonth ? new Date(parseInt(searchYear, 10), parseInt(searchMonth, 10) + 1, 0).getDate() : 31;
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(<option value={i} key={i}>{i}</option>);
        }
        return days;
    };
       const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for(let i= currentYear; i>=2023; i--) {
          years.push(<option value={i} key={i}>{i}</option>);
       }
         return years
     };


    return (
        <div>
             <div className="filter-controls">
                <label>
                    Day:
                     <select name="searchDay" value={searchDay || ""} onChange={handleDayChange}>
                       <option value="">All</option>
                         {generateDayOptions()}
                     </select>
                </label>
                 <label>
                    Month:
                    <select name="searchMonth" value={searchMonth || ""} onChange={handleMonthChange}>
                      <option value="">All</option>
                        <option value="0">January</option>
                         <option value="1">February</option>
                         <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                         <option value="5">June</option>
                        <option value="6">July</option>
                         <option value="7">August</option>
                        <option value="8">September</option>
                         <option value="9">October</option>
                         <option value="10">November</option>
                        <option value="11">December</option>
                   </select>
                </label>
                <label>
                   Year:
                   <select name="searchYear" value={searchYear || ""} onChange={handleYearChange}>
                        <option value="">All</option>
                        {generateYearOptions()}
                    </select>
               </label>

            </div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default TemperatureChart;