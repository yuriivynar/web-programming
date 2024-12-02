import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth.js';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/register" />;
};

export default PrivateRoute;