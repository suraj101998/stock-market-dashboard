import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import PrivateRoute from './components/Auth/PrivateRoute';
import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/register" component={Register} /> */}
        {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
