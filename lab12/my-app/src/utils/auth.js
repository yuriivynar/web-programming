import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const register = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/api/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/api/login`, userData);
  return response.data;
};

export const deleteUser = async (token) => {
  const response = await axios.delete(`${API_BASE_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getUserInfo = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/api/user-info`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const addToCart = async (items) => {
  const token = getToken();
  const response = await axios.post(`${API_BASE_URL}/api/cart`, { items }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getCart = async () => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/api/cart`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const clearCart = async () => {
  const token = getToken();
  const response = await axios.patch(`${API_BASE_URL}/api/clear-cart`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const removeItemFromCart = async (itemId, itemColor) => {
  const token = getToken();
  const response = await axios.patch(`${API_BASE_URL}/api/cart/remove-item`, { itemId, itemColor }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};