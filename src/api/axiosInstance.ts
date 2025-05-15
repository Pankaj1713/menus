import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = process.env.NEXT_PUBLIC_API_TOKEN;
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    config.headers["Timezone"] = timeZone;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
