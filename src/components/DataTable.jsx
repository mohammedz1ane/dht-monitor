// src/components/DataTable.jsx
import React, { useState, useMemo, useRef } from 'react';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import '../styles/index.css';
import { FaPrint } from 'react-icons/fa';

const DataTable = ({ data }) => {
    const [filter, setFilter] = useState({
        tempRange: null,
        humRange: null,
        topCount: 10,
        searchDay: null,
        searchMonth: null,
        searchYear: null,
    });
    const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
    const downloadBtnRef = useRef(null);
    const tableRef = useRef(null);

    const filteredData = useMemo(() => {
         let filtered = [...data];
         const now = new Date();
         const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
         filtered = filtered.filter(item => new Date(item.dt) <= today);

        if (filter.searchDay || filter.searchMonth || filter.searchYear) {
           const searchYearInt = filter.searchYear ? parseInt(filter.searchYear, 10) : NaN;
             const searchMonthInt = filter.searchMonth ? parseInt(filter.searchMonth, 10) : NaN;
            const searchDayInt = filter.searchDay ? parseInt(filter.searchDay, 10) : NaN;

             filtered = filtered.filter(item => {
               const itemDate = new Date(item.dt);
               const itemYear = itemDate.getFullYear();
                const itemMonth = itemDate.getMonth();
               const itemDay = itemDate.getDate();

                 if (!isNaN(searchYearInt)) {
                    if (itemYear === searchYearInt) {
                       if (!isNaN(searchMonthInt))
                        {
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
              }
             else if (isNaN(searchYearInt) && !isNaN(searchDayInt))
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
                 else if(isNaN(searchYearInt) && isNaN(searchMonthInt) && isNaN(searchDayInt))
                 {
                     return true;
                  }
                 return false;
            });
        }


        // Temperature filtering
        if (filter.tempRange) {
           filtered = filtered.filter(item => item.temp >= filter.tempRange.min && item.temp <= filter.tempRange.max);
        }
        // Humidity filtering
        if (filter.humRange) {
             filtered = filtered.filter(item => item.hum >= filter.humRange.min && item.hum <= filter.humRange.max);
        }

        // Top count filtering
        filtered = filtered.slice(0, filter.topCount);
        return filtered;
    }, [data, filter]);

   const handleDownload = (format) => {
        const dataToDownload = filteredData.map(item => ({
            ID: item.id,
            Temperature: item.temp,
            Humidity: item.hum,
           Timestamp: new Date(item.dt).toLocaleString()
        }));

        if (format === 'json') {
            downloadJson(dataToDownload)
       } else if (format === 'pdf') {
           downloadPdf(dataToDownload);
        }
        setIsDownloadDropdownOpen(false);
    };

    const downloadJson = (data) => {
       const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
       const url = URL.createObjectURL(blob);
       const link = document.createElement('a');
       link.href = url;
        link.download = 'dht_data.json';
       link.click();
         URL.revokeObjectURL(url);
    };

    const downloadPdf = async (data) => {
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

                  while(currentPart>0)
                  {
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
                        doc.addImage(part, 'PNG', 10, y, imgWidth,  (canvas.height * imgWidth) / canvas.width);
                        y += (canvas.height * imgWidth) / canvas.width
                   }
               }
              else {
                    doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
               }
             doc.save('dht_data.pdf');
        }
    };

    const toggleDownloadDropdown = () => {
        setIsDownloadDropdownOpen(!isDownloadDropdownOpen);
    };

    const closeDownloadDropdown = () => {
        setIsDownloadDropdownOpen(false);
    };
  
  const handleFilterChange = (e) => {
         const { name, value } = e.target;
          if (name === "tempRange" || name === "humRange") {
             const [min, max] = value.split('-').map(Number);
             setFilter(prev => ({ ...prev, [name]: { min: min, max: max } }));
          } else {
             setFilter(prev => ({ ...prev, [name]: value }));
         }
  };


    const handleDayChange = (e) => {
        setFilter(prev => ({ ...prev, searchDay: e.target.value }));
    };
    const handleMonthChange = (e) => {
        setFilter(prev => ({ ...prev, searchMonth: e.target.value, searchDay: null }));
    };
    const handleYearChange = (e) => {
       setFilter(prev => ({ ...prev, searchYear: e.target.value, searchDay: null }));
  };

      const generateDayOptions = () => {
        const daysInMonth = filter.searchMonth ? new Date(parseInt(filter.searchYear, 10), parseInt(filter.searchMonth, 10) + 1, 0).getDate() : 31;
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
                     <select name="searchDay" value={filter.searchDay || ""} onChange={handleDayChange}>
                      <option value="">All</option>
                         {generateDayOptions()}
                    </select>
                </label>
               <label>
                    Month:
                   <select name="searchMonth" value={filter.searchMonth || ""} onChange={handleMonthChange}>
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
                    <select name="searchYear" value={filter.searchYear || ""} onChange={handleYearChange}>
                        <option value="">All</option>
                       {generateYearOptions()}
                   </select>
               </label>
               <label>
                   Temperature Range:
                    <select name="tempRange" value={filter.tempRange ? `${filter.tempRange.min}-${filter.tempRange.max}` : ''} onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="10-20">10-20 °C</option>
                       <option value="20-30">20-30 °C</option>
                         <option value="30-40">30-40 °C</option>
                   </select>
               </label>
               <label>
                   Humidity Range:
                   <select name="humRange" value={filter.humRange ? `${filter.humRange.min}-${filter.humRange.max}` : ''} onChange={handleFilterChange}>
                       <option value="">All</option>
                        <option value="20-40">20-40 %</option>
                       <option value="40-60">40-60 %</option>
                        <option value="60-80">60-80 %</option>
                    </select>
               </label>
               <label>
                   Top Results:
                    <select name="topCount" value={filter.topCount} onChange={handleFilterChange}>
                       <option value="10">Top 10</option>
                       <option value="100">Top 100</option>
                       <option value="200">Top 200</option>
                        <option value={data.length}>All</option>
                  </select>
              </label>
              <div ref={downloadBtnRef} className="download-button-container">
                    <button className='download-button' onClick={toggleDownloadDropdown}>
                       <FaPrint />
                    </button>
                      {isDownloadDropdownOpen && (
                         <div className="download-dropdown">
                            <button onClick={() => handleDownload('json')}>JSON</button>
                           <button onClick={() => handleDownload('pdf')}>PDF</button>
                        </div>
                   )}
               </div>
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
                        {filteredData.map((item) => (
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

export default DataTable;