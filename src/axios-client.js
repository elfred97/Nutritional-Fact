// Install Axios
import axios from 'axios';

const axiosClient = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config)=> {
    // const token = localStorage.getItem('ACCESS_TOKEN');
    const token = '6t4IY9bVUmWRpbii3J9kS1yZtBvrvlpUQRoMgwFk';
    config.headers.X-Api-Key = token;
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    try{
        const response = error;
        if(response.status === 401){
            localStorage.removeItem('ACCESS_TOKEN');
            // window.location.href = '/login';
        }
        // return Promise.reject(error);
    }
    catch(e){
        console.log(e);
    }
    throw error;
});

export default axiosClient;