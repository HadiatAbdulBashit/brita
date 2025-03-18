import axios from "axios";

const aFetch = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 3000,
  headers: { "X-Api-Key": import.meta.env.VITE_API_KEY },
});

export default aFetch;
