import React, { useEffect, useState } from 'react';
import StockWidget from './StockWidget';
import { fetchRealTimeData } from '../../services/stockService';

const Dashboard = () => {
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
        setFilteredData(data); // Initialize filteredData with the fetched data
      } catch (error) {
        console.error('Error fetching real-time data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter stocks based on the search term
    const filteredStocks = realTimeData.filter((stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort stocks based on the selected criteria
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
    <div>
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
          {/* Add more options as needed */}
        </select>
        <select value={sortOrder} onChange={handleSortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {filteredData.map((stock) => (
        <StockWidget key={stock.symbol} stock={stock} />
      ))}
    </div>
  );
};

export default Dashboard;
