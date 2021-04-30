import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BASEURL || 'http://localhost:3333',
})

export default api;