import axios, { InternalAxiosRequestConfig } from "axios";
import { logout } from "../redux/reducers/userReducer";
import store from "../redux/store";
import { SessionStorageUtils } from "../utils/SessionStorageUtils";

const AUTH_KEY = "auth";

export const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosConfig.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const authDetails = SessionStorageUtils.getParseItem(AUTH_KEY);
  if (
    config.url?.includes("/user") ||
    (config.url?.includes("/refreshToken") && authDetails)
  ) {
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
    if (
      error?.response?.status === 401 &&
      originalRequest.url.includes("/user")
    ) {
      store.dispatch(logout());
    }
    return error.response;
  }
);
