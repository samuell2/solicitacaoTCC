import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://10.107.188.42:3000'
    //baseURL: 'http://192.168.1.83:3000'
    baseURL: 'http://192.168.1.110:3000'
});

export default api;