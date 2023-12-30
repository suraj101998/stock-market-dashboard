import React, { useEffect, useState } from 'react';
import StockWidget from './StockWidget';
import { fetchRealTimeData } from '../../services/stockService';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { NotificationProvider, useNotifications } from '../../contexts/NotificationContext';

const dashboardContainerStyle = {
  margin: '20px',
  textAlign: 'center',
};

const inputStyle = {
  margin: '10px 0',
  padding: '8px',
  fontSize: '16px',
};

const selectStyle = {
  margin: '10px 0',
  padding: '8px',
  fontSize: '16px',
};

const buttonStyle = {
  backgroundColor: '#ff0000',
  color: 'white',
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  marginTop: '20px',
};

const buttonHoverStyle = {
  backgroundColor: '#d40000',
};

const Dashboard = ({ onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const { enableNotifications, toggleNotifications } = useNotifications();
  const [allRealTimeData, setAllRealTimeData] = useState([]);
  const [displayedWidgets, setDisplayedWidgets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('symbol');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRealTimeData();
        setAllRealTimeData(data);
        setDisplayedWidgets(data); // Initially, displayed widgets are the same as all data
      } catch (error) {
        console.error('Error fetching real-time data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Apply filters and sorting logic to allRealTimeData
    let filteredStocks = [...allRealTimeData];

    filteredStocks = filteredStocks.filter(
      (stock) => stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredStocks = filteredStocks.sort((a, b) => {
      const aValue = sortBy === 'latestPrice' ? parseFloat(a[sortBy]) : a[sortBy];
      const bValue = sortBy === 'latestPrice' ? parseFloat(b[sortBy]) : b[sortBy];

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setDisplayedWidgets(filteredStocks);
  }, [allRealTimeData, searchTerm, sortBy, sortOrder]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrder = (event) => {
    setSortOrder(event.target.value);
  };

  const handleWidgetSelection = (symbol) => {
    // Toggle widget selection
    if (selectedWidgets.includes(symbol)) {
      setSelectedWidgets(selectedWidgets.filter((widget) => widget !== symbol));
    } else {
      setSelectedWidgets([...selectedWidgets, symbol]);
    }
  };

  const handleRemoveWidgets = () => {
    // Filter out selected widgets from displayed widgets
    const updatedWidgets = displayedWidgets.filter((stock) => !selectedWidgets.includes(stock.symbol));
    setDisplayedWidgets(updatedWidgets);
    setSelectedWidgets([]); // Clear selected widgets after removal
  };

  const handleDragEnd = (result) => {
    // Check if the drop was successful and reorder displayedWidgets accordingly
    if (result.destination) {
      const updatedWidgets = [...displayedWidgets];
      const [movedWidget] = updatedWidgets.splice(result.source.index, 1);
      updatedWidgets.splice(result.destination.index, 0, movedWidget);
      setDisplayedWidgets(updatedWidgets);
    }
  };

  return (
    <ThemeProvider>
      <NotificationProvider>
        <DndProvider backend={HTML5Backend}>
          <div style={{ ...dashboardContainerStyle, background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
            <h2>Dashboard</h2>
  
            {/* Theme Selector */}
            <div>
              <label>Theme:</label>
              <select value={theme} onChange={toggleTheme}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
  
            {/* Notifications Toggle */}
            <div>
              <label>Notifications:</label>
              <input
                type="checkbox"
                checked={enableNotifications}
                onChange={toggleNotifications}
              />
            </div>
  
            {/* Search */}
            <div>
              <label>Search: </label>
              <input style={inputStyle} type="text" value={searchTerm} onChange={handleSearch} />
            </div>
  
            {/* Sort By */}
            <div>
              <label>Sort By: </label>
              <select style={selectStyle} value={sortBy} onChange={handleSort}>
                <option value="symbol">Symbol</option>
                <option value="latestPrice">Latest Price</option>
              </select>
              <select style={selectStyle} value={sortOrder} onChange={handleSortOrder}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
  
            {/* Displayed Widgets */}
            <div>
              {displayedWidgets.map((stock, index) => (
                <StockWidget
                  key={stock.symbol}
                  stock={stock}
                  index={index}
                  handleWidgetSelection={handleWidgetSelection}
                  isSelected={selectedWidgets.includes(stock.symbol)}
                  handleDragEnd={handleDragEnd}
                />
              ))}
            </div>
  
            {/* Logout Button */}
            <button
              style={{ ...buttonStyle, ...(isButtonHovered && buttonHoverStyle) }}
              onClick={onLogout}
              onMouseOver={() => setIsButtonHovered(true)}
              onMouseOut={() => setIsButtonHovered(false)}
            >
              Logout
            </button>
  
            {/* Remove Selected Widgets Button */}
            <button
              style={{ ...buttonStyle, backgroundColor: 'blue', marginTop: '10px' }}
              onClick={handleRemoveWidgets}
              onMouseOver={() => setIsButtonHovered(true)}
              onMouseOut={() => setIsButtonHovered(false)}
            >
              Remove Selected Widgets
            </button>
          </div>
        </DndProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
  
};

export default Dashboard;
