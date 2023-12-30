// NotificationContext.js
import { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [enableNotifications, setEnableNotifications] = useState(true);

  const toggleNotifications = () => {
    setEnableNotifications((prev) => !prev);
  };

  return (
    <NotificationContext.Provider value={{ enableNotifications, toggleNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
