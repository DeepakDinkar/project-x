import { COURSES } from "../constants/endpoints.constants";
import { axiosConfig } from "./axios-config";

export const getExploreCourses = async (page: number = 1) => {
    const response = await axiosConfig.get(COURSES.EXPLORE + '/' +page);
    return response.status === 200 ? Promise.resolve(response.data) : Promise.reject(new Error("Unable to get courses"));
};