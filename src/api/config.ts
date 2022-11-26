import axios from 'axios';
import {AsyncKeys, getItem} from '../constants/helpers';

export const baseUrl = 'http://camel.faisal49m.com/api/';

export const headers = {
  // 'Content-Type': 'application/x-www-form-urlencoded',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
  'x-requested-api': 'ocapi',
  'x-requested-with': 'XMLHttpRequest',
  Accept: 'application/json',
};

export const axiosAPI = axios.create({
  baseURL: baseUrl,
  headers: headers,
});

axiosAPI.interceptors.request.use(
  async config => {
    const token = (await getItem(AsyncKeys.AUTH_TOKEN)) || '';
    if (token) {
      // config.headers['Accept-Language'] = token;
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    // const language = (await getItem(AsyncKeys.LANGUAGE)) || '';
    // if (language) {
    //   config.headers['Accept-Language'] = language;
    // }

    return config;
  },
  error => {
    console.log('error ', error);

    Promise.reject(error);
  },
);
