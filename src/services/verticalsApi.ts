import { VERTICALS } from "../constants/endpoints.constants";
import { axiosConfig } from "./axios-config";

export const getVerticals = async () => {
    const response = await axiosConfig.get(VERTICALS.ALL);
    return response.status === 200 ? Promise.resolve(response.data) : Promise.reject(new Error("Unable to get verticals"));
};