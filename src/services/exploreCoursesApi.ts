/* eslint-disable @typescript-eslint/no-explicit-any */
import { SEARCH } from "../constants/endpoints.constants";
import { axiosConfig } from "./axios-config";

export const getExploreCourses = async (params?: any) => {
  const response = await axiosConfig.get(SEARCH.EXPLORE, { params: params });
  return response.status === 200
    ? Promise.resolve(response.data)
    : Promise.reject(new Error("Unable to get courses"));
};
