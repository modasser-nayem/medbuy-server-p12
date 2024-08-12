import { z } from "zod";
import { USER_ROLE } from "../constant/user";
import authSchemaValidation from "../validation/auth";
import userSchemaValidation from "../validation/user";

export type TUserRole = keyof typeof USER_ROLE;

export interface IUserSchema {
  name: string;
  email: string;
  password: string;
  photo: string;
  role: TUserRole;
  email_verified: boolean;
}

export type TRegisterUser = z.infer<typeof authSchemaValidation.registerUser>;

export type TLoginUser = z.infer<typeof authSchemaValidation.loginUser>;

export type TRequestOTP = z.infer<typeof authSchemaValidation.requestOTP>;

export type TVerifyOTP = z.infer<typeof authSchemaValidation.verifyOTP>;

export type TUpdateUserProfile = z.infer<
  typeof userSchemaValidation.updateUserProfile
>;

export type TUpdateUserRole = z.infer<
  typeof userSchemaValidation.updateUserRole
>;
