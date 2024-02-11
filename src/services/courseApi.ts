import { COURSES } from "../constants/endpoints.constants";
import { axiosConfig } from "./axios-config";

export const getTrendingCourses = async () => {
  const response = await axiosConfig.get(COURSES.TRENDING);
  return response.status === 200
    ? Promise.resolve(response.data)
    : Promise.reject(new Error("Unable to get trending courses"));
};

export const getCourseByCourseId = async (courseId: number) => {
  const response = await axiosConfig.get(COURSES.All + "/" + courseId);
  return response.status === 200
    ? Promise.resolve(response.data)
    : Promise.reject(new Error("Unable to get course information"));
};

export const getAllCourseLocations = async () => {
  const response = await axiosConfig.get(COURSES.All + COURSES.LOCATIONS);
  return response.status === 200
    ? Promise.resolve(response.data)
    : Promise.reject(new Error("Unable to get course locations"));
};
