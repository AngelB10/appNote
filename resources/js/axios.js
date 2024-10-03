import axios from 'axios';

const requestAxios = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
},
  timeout: 10000, 
});


requestAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default requestAxios;







