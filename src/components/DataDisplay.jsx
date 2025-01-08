

const DataDisplay = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No data available.</p>;
      }
    const lastData = data[data.length - 1];
    return (
        <div className="data-display">
        <h2>Last Data</h2>
        <div className="data-item">
            <p>Temperature: {lastData.temp}°C</p>
            <p>Humidity: {lastData.hum}%</p>
            <p>Last Updated: {new Date(lastData.dt).toLocaleString()}</p>
        </div>
    </div>
    );
};
export default DataDisplay;