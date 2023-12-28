// StockWidget.js
import React from 'react';

const StockWidget = ({ stock }) => {
  const widgetStyle = {
    border: '1px solid #eaeaea',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  };

  const symbolStyle = {
    fontSize: '1.5rem',
    margin: '0 0 10px 0',
    color: '#333',
  };

  const priceStyle = {
    margin: '0',
    fontWeight: 'bold',
    color: '#007bff',
  };

  return (
    <div style={widgetStyle}>
      <h3 style={symbolStyle}>{stock.symbol}</h3>
      <p style={priceStyle}>Last Price: ${stock.latestPrice.toFixed(2)}</p>
      {/* Add more information as needed */}
    </div>
  );
};

export default StockWidget;
