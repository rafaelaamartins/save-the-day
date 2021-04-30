import axios from 'axios';

const api = axios.create({
  baseURL: `https://save-the-day-backend.herokuapp.com/`
})

export default api;