import { QOMOI } from "../constants/endpoints.constants";
import { RequestCallbackForm } from "../models/RequestCallbackForm";
import { axiosConfig } from "./axios-config";

export const requestCallback = async (payload: RequestCallbackForm) => {
  const response = await axiosConfig.post(QOMOI.ALL + QOMOI.REQUEST_CALLBACK, payload);
  return response.status === 200 || response.status === 201
    ? Promise.resolve(response.data)
    : Promise.reject(new Error("Unable to get trending courses"));
};
