import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth.js';

const AuthRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/" /> : children;
};

export default AuthRoute;