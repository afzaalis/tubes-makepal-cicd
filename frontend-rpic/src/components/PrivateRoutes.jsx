import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token');  

  if (!isLoggedIn) {
    return <Navigate to="/login" />; 
  }

  return children;  
};

export default PrivateRoute;
