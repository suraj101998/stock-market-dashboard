import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const StockWidget = ({ stock, index, handleWidgetSelection, isSelected, handleDragEnd }) => {
  const widgetStyle = {
    border: '1px solid #eaeaea',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: isSelected ? '#e0f7fa' : '#ffffff', // Highlight selected widget
    cursor: 'move',
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

  const [, drag] = useDrag({
    type: 'STOCK_WIDGET',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'STOCK_WIDGET',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        handleDragEnd({ source: { index: draggedItem.index }, destination: { index } });
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={widgetStyle}>
      <h3 style={symbolStyle}>{stock.symbol}</h3>
      <p style={priceStyle}>Last Price: ${stock.latestPrice.toFixed(2)}</p>
      {/* Add more information as needed */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => handleWidgetSelection(stock.symbol)}
        style={{ marginRight: '5px' }}
      />
      Select
    </div>
  );
};

export default StockWidget;
