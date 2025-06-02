
import axios from 'axios';
import i18n from '../i18n';  

const instance = axios.create({
  baseURL: 'http://localhost:3000',  
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = i18n.language || 'en';
  return config;
});

export default instance;