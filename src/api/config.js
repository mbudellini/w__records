import axios from "axios";

const API_BASE = window.location.href.includes('localhost')
  ? 'http://localhost:4444/api'
  : 'https://wallpapers-by-alex.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE,
});

export { API_BASE };
export default api;

