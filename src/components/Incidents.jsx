// src/components/Incidents.jsx
import React, { useState, useMemo, useRef } from 'react';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import { FaPrint } from 'react-icons/fa';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Incidents = ({ data }) => {
    const [tempRange, setTempRange] = useState({min: 2 , max: 10}); // Default range
    const [searchDate, setSearchDate] = useState(null);
    const [searchMonth, setSearchMonth] = useState(null);
    const [searchYear, setSearchYear] = useState(null);
    const [searchDay, setSearchDay] = useState(null);
    const [topCount, setTopCount] = useState(10);

    const tableRef = useRef(null)

   const filteredIncidents = useMemo(() => {
       let filtered = [...data];
        const now = new Date();
       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
       filtered = filtered.filter(item => new Date(item.dt) <= today);

        if ( searchDay || searchMonth || searchYear) {
           let newSearchDate;
            if(searchDate) {
               newSearchDate = new Date(searchDate);
            }
             const searchYearInt = searchYear ? parseInt(searchYear, 10) : NaN;
           const searchMonthInt = searchMonth ? parseInt(searchMonth, 10) : NaN;
            const searchDayInt = searchDay ? parseInt(searchDay, 10) : NaN;


           filtered = filtered.filter(item => {
                const itemDate = new Date(item.dt);
                const itemYear = itemDate.getFullYear();
                const itemMonth = itemDate.getMonth();
                const itemDay = itemDate.getDate();

                if (itemYear === searchYearInt)
                {
                    if (!isNaN(searchMonthInt) ) {
                         if(itemMonth === searchMonthInt)
                         {
                              if (!isNaN(searchDayInt) ) {
                                  return itemDay === searchDayInt
                               }
                                 return true
                           }
                     }
                        else if (isNaN(searchMonthInt))
                        {
                            return true
                       }

                  } else if(isNaN(searchYearInt))
                  {
                     return true
                  }

                 return false;
            });
       }
        return filtered.filter(item => item.temp < tempRange.min || item.temp > tempRange.max).slice(0, topCount);
    }, [data, tempRange, searchDate, searchMonth, searchYear, searchDay, topCount]);

    const chartData = useMemo(() => {
        const labels = filteredIncidents.map(item => new Date(item.dt).toLocaleTimeString());
         return  {
              labels: labels,
                datasets: [{
                   label: 'Temperature (°C)',
                   data: filteredIncidents.map(item => item.temp),
                  fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1,
                     pointHoverRadius: 7,
                    pointHoverBackgroundColor: 'rgb(255, 99, 132)',
                   pointHoverBorderColor: 'black',
                    pointHoverBorderWidth: 2,

                }],
            };
  }, [filteredIncidents]);

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
                            const item = filteredIncidents[index];
                             return `Temperature: ${item.temp} °C, Humidity: ${item.hum} %, Date: ${new Date(item.dt).toLocaleString()}`
                        }
                    }
              }
       }
   };
    const handleTopCountChange = (e) => {
      setTopCount(e.target.value);
   };

    const handleRangeChange = (e) => {
        const [min, max] = e.target.value.split('-').map(Number);
       setTempRange({min: min, max: max})
   };

   const handleDownloadPdf = async () => {
         if (tableRef.current) {
              const canvas = await html2canvas(tableRef.current);
                const imgData = canvas.toDataURL('image/png');

               const doc = new jsPDF('p', 'mm', 'a4');
              const pageWidth = doc.internal.pageSize.getWidth();
              const pageHeight = doc.internal.pageSize.getHeight();

                const imgWidth = pageWidth - 20; // Reduced for margin
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let y = 10;
              if (imgHeight > pageHeight - 20) {
                 let x = 10;
                    let currentY = 10;
                  let parts = [];
                let currentPart = canvas.height;

                 while (currentPart>0) {
                      const partHeight = pageHeight - 20;
                      const heightToAdd = Math.min(currentPart, partHeight);
                         const partCanvas = document.createElement('canvas');
                       partCanvas.width = canvas.width;
                        partCanvas.height = heightToAdd;
                        const partContext = partCanvas.getContext('2d');
                        partContext.drawImage(canvas, 0, canvas.height - currentPart , canvas.width, heightToAdd, 0, 0, canvas.width, heightToAdd);
                         const partImgData = partCanvas.toDataURL('image/png');
                       parts.push(partImgData);
                      currentY += partHeight
                       currentPart -= heightToAdd;
                    }
                      for(let part of parts){
                          if(y>10)
                        {
                             doc.addPage();
                           y=10;
                       }
                      doc.addImage(part, 'PNG', 10, y, imgWidth, (canvas.height * imgWidth) / canvas.width);
                         y += (canvas.height * imgWidth) / canvas.width
                   }

             } else {
                 doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
             }
            doc.save('incidents.pdf');
       }
    };
  const handleDateChange = (e) => {
        setSearchDate(e.target.value);
        setSearchMonth(null);
         setSearchYear(null);
          setSearchDay(null);
   };
    const handleMonthChange = (e) => {
       setSearchMonth(e.target.value);
         setSearchDate(null);
           setSearchDay(null);
    };
     const handleYearChange = (e) => {
         setSearchYear(e.target.value);
          setSearchDate(null);
           setSearchDay(null);
   };
      const handleDayChange = (e) => {
         setSearchDay(e.target.value);
         setSearchDate(null);
  }

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
       return years;
      };

    return (
        <div className="container">
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
                 <label>
                     Temperature Range:
                     <select name="tempRange" value={`${tempRange.min}-${tempRange.max}`} onChange={handleRangeChange}>
                        <option value="2-10">2-10 °C</option>
                         <option value="-5-35">-5-35 °C</option>
                    </select>
                </label>
                   <label>
                       Top Results:
                        <select name="topCount" value={topCount} onChange={handleTopCountChange}>
                            <option value="10">Top 10</option>
                           <option value="100">Top 100</option>
                             <option value="200">Top 200</option>
                            <option value={data.length}>All</option>
                        </select>
                  </label>
            </div>
             <div className="chart-container">
                <Line data={chartData} options={options} />
             </div>
             <div className="flex justify-end items-center">
                    <button className="download-button" onClick={handleDownloadPdf}> <FaPrint/> </button>
             </div>

            <div className="table-container" ref={tableRef}>
               <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Temperature (°C)</th>
                            <th>Humidity (%)</th>
                           <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIncidents.map((item) => (
                           <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.temp}</td>
                                <td>{item.hum}</td>
                               <td>{new Date(item.dt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
           </div>
       </div>
    );
};

export default Incidents;