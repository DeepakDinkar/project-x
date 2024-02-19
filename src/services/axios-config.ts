import axios, { InternalAxiosRequestConfig } from "axios";
import { SessionStorageUtils } from "../utils/SessionStorageUtils";
import { AUTH } from "../constants/endpoints.constants";

const AUTH_KEY = "auth";

export const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosConfig.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const authDetails = SessionStorageUtils.getParseItem(AUTH_KEY);
  if (config.url?.includes("/user") || config.url?.includes('/refreshToken') && authDetails) {
    config.headers.Authorization = "Bearer " + authDetails?.authToken;
  }
  return config;
});

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && originalRequest.url.includes('/user')) {
      const { token }: { token: string } = await axiosConfig.post(
        AUTH.REFRESH_TOKEN,
        originalRequest
      );
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return axiosConfig(originalRequest);
    }
    return Promise.reject(error);
  }
);
