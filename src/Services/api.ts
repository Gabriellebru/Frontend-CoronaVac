import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://192.168.1.103:3333'
    baseURL: 'http://192.168.1.105:3333'
    // baseURL: 'https://api-coronavac.herokuapp.com/'
    // baseURL: 'http://192.168.0.135:3333'
});

export default api;
