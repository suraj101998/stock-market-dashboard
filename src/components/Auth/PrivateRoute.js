// PrivateRoute.js
import React from 'react';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  if (isAuthenticated) {
    // If authenticated, render the specified component
    return <Component {...rest} />;
  } else {
    // If not authenticated, you can redirect to the login page or any other logic
    // For simplicity, let's simulate a redirect to the login page by rendering null
    return null;
  }
};

export default PrivateRoute;

