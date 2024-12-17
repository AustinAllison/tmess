import axios from 'axios';
import store from './redux/store';

axios.defaults.baseURL = 'http://localhost:5000'; // Adjust based on your backend URL

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
