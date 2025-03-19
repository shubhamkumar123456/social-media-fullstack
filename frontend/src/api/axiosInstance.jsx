import axios from 'axios';
import { updateLoading } from '../features/authSlice';




const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials:true,
    cors:true,
    headers: {
        'Content-Type':'application/json'
    }
  });


  export const setupInterceptors = (dispatch) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            dispatch(updateLoading(true));
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        },
        (error) => {
            dispatch(updateLoading(false));
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            dispatch(updateLoading(false));
            return response;
        },
        (error) => {
            dispatch(updateLoading(false));
            return Promise.reject(error);
        }
    );
};

  export default axiosInstance