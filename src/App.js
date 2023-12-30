// App.js
import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { NotificationProvider } from '../src/contexts/NotificationContext';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleToggleRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <ThemeProvider>
      <NotificationProvider>
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {!isLoggedIn && !showRegister ? (
        <Login onLogin={handleLogin} onToggleRegister={handleToggleRegister} />
      ) : isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Register onRegister={handleLogin} />
      )}
    </div>
    </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
