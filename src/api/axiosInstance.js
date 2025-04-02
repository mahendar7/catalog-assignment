import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'https://api.coingecko.com/api/v3' });

axiosInstance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response && error.response.status === 401) {
            //
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
