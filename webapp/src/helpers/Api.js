import swal from 'sweetalert';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


let token = localStorage.getItem('modernWallet-Token') || null;

const api = axios.create({
  baseURL: 'http://localhost:8081',
});

api.logout = () => {
  token = null;
};

// Add a request interceptor
api.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
  if (response && response.data && response.data.token) {
    token = response.data.token;
    localStorage.setItem('modernWallet-Token', token);
  }

  return response;
}, function (error) {
  let message = error.message;

  if (error.response && error.response.data && error.response.data.error) {
    message = error.response.data.error;
  }

  console.error(error && error.response);
  swal({
    title: "Falha",
    text: message,
    icon: "error",
    onClose: () => {
      if (error.response && error.response.status === 401) {
        window.location.href = '/';
      }
    }
  }).then(() => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/';
    }
  });

  return Promise.reject(error);
});

export default api;
