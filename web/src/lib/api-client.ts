import axios from 'axios';

const apiClient = axios.create({
  //TODO(seieun): server url 설정
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    //TODO(yubin): Access token 추가
    config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
