import { z } from "zod";

const registerUser = z
  .object({
    name: z
      .string({ required_error: "name is required" })
      .refine((value) => value !== "", { message: "name is required" }),
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "invalid email address" }),
    photo: z
      .string({ required_error: "name is required" })
      .url({ message: "Invalid URL" })
      .refine((value) => value !== "", { message: "photo is required" }),
    password: z
      .string({ required_error: "password is required" })
      .refine((value) => value !== "", { message: "password is required" })
      .refine((value) => value.length >= 6, {
        message: "password must be more then 5 character",
      }),
    confirmPassword: z
      .string({ required_error: "confirmPassword is required" })
      .refine((value) => value !== "", {
        message: "confirmPassword is required",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const requestOTP = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" })
    .refine((value) => value !== "", { message: "email is required" }),
});

const verifyOTP = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" })
    .refine((value) => value !== "", { message: "email is required" }),
  otp: z
    .string({ required_error: "opt is required" })
    .refine((value) => value !== "", { message: "opt is required" })
    .refine((value) => value.length === 4, {
      message: "otp only 4 character",
    }),
});

const loginUser = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" })
    .refine((value) => value !== "", { message: "email is required" }),
  password: z
    .string({ required_error: "password is required" })
    .refine((value) => value !== "", { message: "password is required" }),
});

const authSchemaValidation = {
  registerUser,
  loginUser,
  requestOTP,
  verifyOTP,
};
export default authSchemaValidation;
