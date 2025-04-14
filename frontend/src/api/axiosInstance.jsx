import axios from 'axios';
import { logoutUser, updateLoading } from '../features/authSlice';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';




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
            const token = JSON.parse(localStorage.getItem('authSocial'))
            console.log("local storagetoken = ", token)
            if (token) {
                console.log(token.token)
                config.headers.Authorization = token.token;
            }
            return config;
        },
        (error) => {
            console.log(error)
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
            console.log(error)
            if(error.response.data.error==='jwt expired'){
                toast.warning('token expired please login again',{position:"top-center"})
                setTimeout(()=>{
                    localStorage.removeItem('authSocial')
                   dispatch(logoutUser())
                },3000)
            }
            dispatch(updateLoading(false));
            return Promise.reject(error);
        }
    );
};

  export default axiosInstance