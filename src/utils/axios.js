import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mernappserver-production.up.railway.app/api'
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
})

export default instance;
