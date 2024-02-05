/* eslint-disable @typescript-eslint/no-explicit-any */
import { SEARCH, VERTICALS } from "../constants/endpoints.constants";
import { axiosConfig } from "./axios-config";

export const getVerticals = async () => {
  const response = await axiosConfig.get(VERTICALS.ALL);
  return response.status === 200
    ? Promise.resolve(response.data)
    : Promise.reject(new Error("Unable to get verticals"));
};

export const getVerticalDetails = async (slug: string) => {
  const response = await axiosConfig.get(VERTICALS.ALL + "/" + slug);
  return response.status === 200
    ? Promise.resolve(response.data)
    : Promise.reject(new Error("Unable to get vertical courses"));
};

export const getVerticalCourses = async (slug: string, page: number, params?: any) => {
  const response = await axiosConfig.get(SEARCH.VERTICAL_COURSES + "/" + slug + '/' + page, { params: params});
  return response.status === 200
    ? Promise.resolve(response.data)
    : Promise.reject(new Error("Unable to get vertical courses"));
};

