import axios from 'axios';

const api = axios.create({
  baseURL: 'https://3333-harlequin-viper-nl7y1t44.ws-us04.gitpod.io/',
  timeout: 15000,
  headers: {
      "Content-Type": "application/json"
  }
})

export default api;