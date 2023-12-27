import React from 'react';

const StockWidget = ({ stock }) => {
  return (
    <div>
      <h3>{stock.symbol}</h3>
      <p>Last Price: {stock.latestPrice}</p>
      {/* Add more information as needed */}
    </div>
  );
};

export default StockWidget;
