import { COURSES } from "../constants/endpoints.constants";
import { axiosConfig } from "./axios-config";

export const getBannerVerticalCourses = async () => {
  const response = await axiosConfig.get(COURSES.All + COURSES.BANNER);
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

export const getRecommendedCourses = async (page: number) => {
  const response = await axiosConfig.get(
    COURSES.All + COURSES.RECOMMENDED + "/" + page
  );
  return response.status === 200
    ? Promise.resolve(response.data)
    : Promise.reject(new Error("Unable to get recommended courses"));
};

export const getTrendingCourses = async (page: number) => {
  const response = await axiosConfig.get(
    COURSES.All + COURSES.RECOMMENDED + "/" + page
  );
  return response.status === 200
    ? Promise.resolve(response.data)
    : Promise.reject(new Error("Unable to get recommended courses"));
};

export const getSimilarCourses = async (slug: string, page: number) => {
  const response = await axiosConfig.get(
    COURSES.All + COURSES.SIMILAR + "/" + slug + "/" + page
  );
  return response.status === 200
    ? Promise.resolve(response.data)
    : Promise.reject(new Error("Unable to get recommended courses"));
};
