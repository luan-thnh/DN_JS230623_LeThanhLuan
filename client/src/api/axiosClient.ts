import axios, { AxiosResponse } from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_ENDPOINT,
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error.response?.data);
  }
);

export default axiosClient;
