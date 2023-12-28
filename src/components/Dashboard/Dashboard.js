// Dashboard.js
import React, { useEffect, useState } from 'react';
import StockWidget from './StockWidget';
import { fetchRealTimeData } from '../../services/stockService';

const Dashboard = ({ onLogout }) => {
  const [realTimeData, setRealTimeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('symbol');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRealTimeData();
        setRealTimeData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching real-time data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredStocks = realTimeData.filter((stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedStocks = filteredStocks.sort((a, b) => {
      const aValue = sortBy === 'latestPrice' ? parseFloat(a[sortBy]) : a[sortBy];
      const bValue = sortBy === 'latestPrice' ? parseFloat(b[sortBy]) : b[sortBy];

      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    setFilteredData(sortedStocks);
  }, [realTimeData, searchTerm, sortBy, sortOrder]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);
  };

  const handleSortOrder = (event) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder);
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Dashboard</h2>
      <div>
        <label>Search: </label>
        <input type="text" value={searchTerm} onChange={handleSearch} />
      </div>
      <div>
        <label>Sort By: </label>
        <select value={sortBy} onChange={handleSort}>
          <option value="symbol">Symbol</option>
          <option value="latestPrice">Latest Price</option>
        </select>
        <select value={sortOrder} onChange={handleSortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {filteredData.map((stock) => (
        <StockWidget key={stock.symbol} stock={stock} />
      ))}
      <button style={{ backgroundColor: '#ff0000', color: 'white', padding: '10px 20px', fontSize: '16px', border: 'none', cursor: 'pointer', marginTop: '20px' }} onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
