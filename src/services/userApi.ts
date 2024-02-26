import { AUTH, USER } from "../constants/endpoints.constants";
import { LoginPayload } from "../models/LoginPayload";
import { ProfileForm } from "../models/ProfileForm";
import { RegisterForm } from "../models/RegisterForm";
import { axiosConfig } from "./axios-config";

export const registerUser = async (userDetails: RegisterForm) => {
  const response = await axiosConfig.post(AUTH.SIGN_UP, userDetails);
  return response.status === 200 || response.status === 201
    ? Promise.resolve(response.data)
    : Promise.reject(response.data);
};

export const loginUser = async (userDetails: LoginPayload) => {
  const response = await axiosConfig.post(AUTH.LOGIN, userDetails);
  return response.status === 200
    ? Promise.resolve(response.data)
    : Promise.reject(response.data);
};

export const getUserProfile = async () => {
  const response = await axiosConfig.get(USER.GET_USER);
  return response.status === 200
    ? Promise.resolve(response.data)
    : Promise.reject(response.data);
};

export const updateProfile = async (profile: ProfileForm) => {
  const response = await axiosConfig.post(
    USER.UPDATE_USER,
    profile
  );
  return response?.status === 200 || response?.status === 201
    ? Promise.resolve(response.data)
    : Promise.reject(response.data);
};

export const forgetPassword = async (payload: { emailId: string }) => {
  const response = await axiosConfig.post(AUTH.FORGET_PASSWORD, payload);
  return response.status === 200 || response.status === 201
    ? Promise.resolve(response.data)
    : Promise.reject(response.data);
};

export const logoutUser = async () => {
  const response = await axiosConfig.post(AUTH.LOGOUT);
  return response?.status === 200 || response?.status === 201
    ? Promise.resolve(response.data)
    : Promise.reject(response.data);
};

export const getUserPurchases = async () => {
  const response = await axiosConfig.get(USER.PURCHASES);
  return response.status === 200
    ? Promise.resolve(response.data)
    : Promise.reject(response.data);
};

export const getUserCourses = async () => {
  const response = await axiosConfig.get(USER.COURSES);
  return response.status === 200
    ? Promise.resolve(response.data)
    : Promise.reject(response.data);
};

