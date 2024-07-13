import axios from 'axios';

const API = axios.create({
  // TODO: replace URL value from env
  baseURL: 'http://4.206.217.243:8080/api/v1'
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
      // Handle unauthorized error, for example, redirect to login
    }
    return Promise.reject(error);
  }
);

export default API;
