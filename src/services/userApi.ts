import { AUTH } from "../constants/endpoints.constants";
import { LoginPayload } from "../models/LoginPayload";
import { RegisterForm } from "../models/RegisterForm";
import { axiosConfig } from "./axios-config";

export const registerUser = async (userDetails: RegisterForm) => {
    const response = await axiosConfig.post(AUTH.SIGN_UP, userDetails);
    return response.status === 200
        ? Promise.resolve(response.data)
        : Promise.reject(new Error("Unable to get vertical courses"));
};

export const loginUser = async (userDetails: LoginPayload) => {
    const response = await axiosConfig.post(AUTH.LOGIN, userDetails);
    return response.status === 200
        ? Promise.resolve(response.data)
        : Promise.reject(new Error("Unable to get vertical courses"));
};