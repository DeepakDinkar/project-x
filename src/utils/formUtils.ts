import { LoginForm } from "../models/LoginForm";
import { ProfileForm } from "../models/ProfileForm";
import { ProfilePayload } from "../models/ProfilePayload";
import { RegisterForm } from "../models/RegisterForm";
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
  payload.emailId = values.email;
  payload.password = await bycryptPassword(values.password);
  payload.mobile = values.phoneNumber;
  payload.location = values.location;

  return payload;
};

export const mapLoginFormPayLoad = async (values: LoginForm): Promise<LoginPayload> => {
  const payload = new LoginPayload();
  payload.emailId = values.email;
  payload.password = await bycryptPassword(values.password);
  return payload;
};

export const mapProfilePayLoad = (values: ProfileForm): ProfilePayload => {
  const payload = new ProfilePayload();

  payload.firstName = values.firstName;
  payload.lastName = values.lastName;
  payload.address1 = values.addressLine1;
  payload.address2 = values.addressLine2;
  payload.phoneNo = values.mobile;
  payload.city = values.city;
  payload.zipCode = values.zipcode; 
  payload.country = values.country;

  return payload;
}

