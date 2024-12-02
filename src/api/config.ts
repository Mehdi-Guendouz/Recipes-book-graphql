import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://recipebookapi.vercel.app/",
});

let refresh = false;

// Add a request interceptor to attach the access token from localStorage.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh on 401 error
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && !refresh) {
      refresh = true;

      localStorage.removeItem("token");
      window.location.reload();
      return Promise.reject(error);
    }

    refresh = false;
    return Promise.reject(error);
  }
);
