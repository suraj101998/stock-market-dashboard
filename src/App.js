// // App.js

// import React, { useState } from 'react';
// import Dashboard from './components/Dashboard/Dashboard';
// import Login from './components/Auth/Login';
// import RegisterComponent from './components/Auth/Register';

// const App = () => {
//   const [user, setUser] = useState(null);

//   const handleLogin = (userData) => {
//     setUser(userData);
//   };

//   const handleLogout = () => {
//     setUser(null);
//   };

//   return (
//     <div>
//       {!user ? (
//         <>
//           <Login onLogin={handleLogin} />
//           <RegisterComponent />
//         </>
//       ) : (
//         <Dashboard user={user} onLogout={handleLogout} />
//       )}
//     </div>
//   );
// };

// export default App;
// App.js
import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Auth/PrivateRoute';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async (userData) => {
    // Perform your login logic, and if successful, set the user state
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <Login onLogin={handleLogin} />
      <Register onRegister={handleLogin} />

      {/* Example of using PrivateRoute */}
      <PrivateRoute component={Dashboard} isAuthenticated={user !== null} onLogout={handleLogout} />
    </div>
  );
};

export default App;
