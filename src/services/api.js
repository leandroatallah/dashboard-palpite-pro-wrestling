import axios from 'axios';

const API_URL =
  process.env.NODE_ENV !== 'development'
    ? import.meta.env.VITE_API_PRODUCTION_URL
    : import.meta.env.VITE_API_LOCAL_URL;

axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 99999;
axios.defaults.headers = {
  accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
};

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers = {
        ...config.headers,
        accept: 'application/json',
        authorization: `Bearer ${JSON.parse(token)}`,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

const api = axios;

export default api;
