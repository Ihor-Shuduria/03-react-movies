import axios from "axios";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export default axiosInstance;
