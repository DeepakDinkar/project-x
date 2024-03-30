import { LoginForm } from "../models/LoginForm";
import { RegisterForm } from "../models/RegisterForm";
import { ResetPasswordPayload } from "../models/ResetPasswordPayload";
import countryJson from "./../assets/json/country.json";
import { LoginPayload } from "./../models/LoginPayload";
import { RegisterPayload } from "./../models/RegisterPayload";

const bycryptPassword = async (password: string) => {
  return await Promise.resolve(password);
};

export const mapRegisterFormPayLoad = async (
  values: RegisterForm,
  dialCode: string | null
): Promise<RegisterPayload> => {
  const payload = new RegisterPayload();
  payload.firstName = values.firstName;
  payload.lastName = values.lastName;
  payload.email = values.email;
  payload.password = await bycryptPassword(values.password);
  payload.mobile = dialCode ? dialCode + values.phoneNumber : values.phoneNumber;
  payload.country = values.country;

  return payload;
};

export const mapLoginFormPayLoad = async (
  values: LoginForm
): Promise<LoginPayload> => {
  const payload = new LoginPayload();
  payload.email = values.email;
  payload.password = await bycryptPassword(values.password);
  return payload;
};

export const mapResetPasswordPayLoad = (
  values: { password: string },
  token: string
): ResetPasswordPayload => {
  const payload = new ResetPasswordPayload();
  payload.newPassword = values.password;
  payload.token = token;
  return payload;
};

export const getCountryCode = (value: string) => {
  const country = countryJson.find(country => value?.toLowerCase() === country?.name?.toLowerCase());
  return country?.dial_code ?? null; 
}
