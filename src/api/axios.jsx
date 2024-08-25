import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import axios from 'axios';

const API = axios.create({
  // TODO: replace URL value from env
  baseURL: 'http://localhost:3000/api/v1',
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    // Add any custom configurations here
    // For example, adding an Authorization header
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



// Response interceptor
API.interceptors.response.use(
  (response) => {
    // Handle the response data here
    return response;
  },
  (error) => {
    // Handle errors here
    if (error.response && error.response.status === 401) {
      // Token has expired, trigger logout
      const { logout } = useContext(AuthContext); // Get the logout method from the AuthContext

      if (logout) {
        logout(); // Log the user out if the token is expired
      }

      // Optionally, redirect the user to the sign-in page
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default API;
