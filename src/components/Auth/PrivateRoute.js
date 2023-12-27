// // PrivateRoute.js

// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       // Replace the following condition with your authentication logic
//       localStorage.getItem('token') ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

// export default PrivateRoute;

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

