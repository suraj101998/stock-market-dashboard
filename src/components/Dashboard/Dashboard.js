import React, { useEffect, useState } from 'react';
import StockWidget from './StockWidget';
import { fetchRealTimeData } from '../../services/stockService';

const Dashboard = () => {
  const [realTimeData, setRealTimeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRealTimeData();
        setRealTimeData(data);
      } catch (error) {
        console.error('Error fetching real-time data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        realTimeData.map((stock) => (
          <StockWidget key={stock.symbol} stock={stock} />
        ))
      )}
    </div>
  );
};

export default Dashboard;
