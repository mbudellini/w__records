import axios from "axios";

const API_BASE = "http://localhost:4444";

const api = axios.create({
  baseURL: API_BASE,
});

export { API_BASE };
export default api;
