import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ element: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem("loggedInUser") !== null;
  return isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default AuthRoute;
