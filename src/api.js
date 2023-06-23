import axios from 'axios';
import i18n from 'i18next';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept-Language': 'ko',
  },
});

api.interceptors.request.use(
  config => {
    config.headers['Accept-Language'] = i18n.language.match(/ru-RU|ru/) ? 'ru' : 'ko';
    return config;
  },
  error => Promise.reject(error)
);
