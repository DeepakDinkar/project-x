import { LoginForm } from "../models/LoginForm";
import { ProfileForm } from "../models/ProfileForm";
import { ProfilePayload } from "../models/ProfilePayload";
import { RegisterForm } from "../models/RegisterForm";
import { ResetPasswordPayload } from "../models/ResetPasswordPayload";
import { LoginPayload } from "./../models/LoginPayload";
import { RegisterPayload } from "./../models/RegisterPayload";

const bycryptPassword = async (password: string) => {
  return await Promise.resolve(password);
};

export const mapRegisterFormPayLoad = async (
  values: RegisterForm
): Promise<RegisterPayload> => {
  const payload = new RegisterPayload();
  payload.firstName = values.firstName;
  payload.lastName = values.lastName;
  payload.email = values.email;
  payload.password = await bycryptPassword(values.password);
  payload.mobile = values.phoneNumber;
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

export const mapProfilePayLoad = (values: ProfileForm): ProfilePayload => {
  const payload = new ProfilePayload();

  payload.firstName = values.firstName;
  payload.lastName = values.lastName;
  payload.address1 = values.address1;
  payload.address2 = values.address2;
  payload.phoneNo = values.phoneNo;
  payload.city = values.city;
  payload.zipCode = values.zipCode;
  payload.country = values.country;
  payload.imageUrl = values.imageUrl;

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
