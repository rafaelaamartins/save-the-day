import axios from 'axios';

const api = axios.create({
  baseURL: 'https://save-the-day-backend.herokuapp.com/',
  timeout: 15000,
  headers: {
      "Content-Type": "application/json"
  }
})

export default api;