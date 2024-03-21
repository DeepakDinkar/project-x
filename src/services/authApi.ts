import { AUTH } from "../constants/endpoints.constants";
import { axiosConfig } from "./axios-config";

export const getSecretKey = async () => {
  const response = await axiosConfig.get(AUTH.GET_KEY);
  return response.status === 200 || response.status === 201
    ? Promise.resolve(response.data)
    : Promise.reject(response.data);
};

export const getStoredData = async (key: string) => {
  const response = await axiosConfig.get(AUTH.GET_STORED_DATA + "/" + key);
  return response.status === 200 || response.status === 201
    ? Promise.resolve(response.data)
    : Promise.reject(response.data);
};

export const updateStoredData = async (payload: string) => {
  const response = await axiosConfig.post(AUTH.UPDATE_STORE_DATA, payload);
  return response.status === 200 || response.status === 201
    ? Promise.resolve(response.data)
    : Promise.reject(response.data);
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateStripeData = async (payload: any) => {
  const response = await axiosConfig.post(AUTH.STRIPE_TESTING, payload);
  return response.status === 200 || response.status === 201
    ? Promise.resolve(response.data)
    : Promise.reject(response.data);
};