import React from "react";
import { Redirect, Route } from "react-router-dom";

function PublicRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("user");
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        !isAuthenticated ? <Component {...props} /> 
        : 
        <Redirect from="/login" to="/"/>
      }
    />
  );
}

export default PublicRoute;