import { SEARCH } from "../constants/endpoints.constants";
import { axiosConfig } from "./axios-config";

export const getSearchResultsByQuery = async (query: string) => {
    const response = await axiosConfig.get(SEARCH.ALL, { params: { query: query}});
    return response.status === 200
      ? Promise.resolve(response.data)
      : Promise.reject(new Error("Unable to get vertical courses"));
  };