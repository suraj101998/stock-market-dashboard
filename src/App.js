import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Auth/PrivateRoute';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <Login onLogin={handleLogin} />
      <Register onRegister={handleLogin} />

      <PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={user !== null} onLogout={handleLogout} />
    </div>
  );
};

export default App;
