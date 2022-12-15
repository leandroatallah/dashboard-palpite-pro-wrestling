import axios from 'axios';
import {queryClient} from './query';

const API_URL =
  process.env.NODE_ENV !== 'development'
    ? import.meta.env.VITE_API_PRODUCTION_URL
    : import.meta.env.VITE_API_LOCAL_URL;

function clearAllSession() {
  localStorage.removeItem('token');
  queryClient.removeQueries();
}

axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 99999;
axios.defaults.headers = {
  accept: 'application/json',
  'Content-Type': 'application/json',
};

axios.interceptors.request.use(
  async (config) => {
    const isSignRoute =
      config.url === '/user/login' || config.url === '/user/signup';
    const token = localStorage.getItem('token');

    if (token) {
      config.headers = {
        ...config.headers,
        accept: 'application/json',
        authorization: `Bearer ${JSON.parse(token)}`,
      };
    } else {
      if (!isSignRoute) {
        clearAllSession();
        return (window.location = '/login');
      }
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
    const status = error.response?.status;

    if (status && (status === 401 || status === 403)) {
      clearAllSession();
      return (window.location = '/login');
    }

    return Promise.reject(error);
  }
);

const api = axios;

export default api;
