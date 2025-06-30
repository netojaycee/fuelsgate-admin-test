import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/';

const configFunc = (config) => {
  const AUTH_TOKEN = Cookies.get('token');
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
  return config;
};

const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});

http.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

http.interceptors.request.use((config) => configFunc(config));

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove("token");
      Cookies.remove("user");
      window.location.href = '/'
    }

    return Promise.reject(error);
  }
);

export default http;