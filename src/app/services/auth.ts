import {
  TLoginUser,
  TRegisterUser,
  TRequestOTP,
  TVerifyOTP,
} from "../interface/user.interface";
import AppError from "../error/AppError";
import { User } from "../models/user.model";
import {
  checkPasswordIsCorrect,
  createToken,
  generateOTP,
  makeHashPassword,
} from "../helpers/authHelper";
import config from "../config";
import { sendEmail } from "../utils/sendEmail";
import { Response } from "express";

const registerUser = async (payload: { data: TRegisterUser }) => {
  const isEmailExist = await User.findOne({ email: payload.data.email });

  if (isEmailExist) {
    throw new AppError(400, "This email already exist!");
  }

  const password = await makeHashPassword(payload.data.password);

  const userData = {
    name: payload.data.name,
    email: payload.data.email,
    password: password,
    photo: payload.data.photo,
  };

  await User.create(userData);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const otpCache: any = {};

const requestOTP = async (payload: { data: TRequestOTP; res: Response }) => {
  if (!(await User.findOne({ email: payload.data.email }))) {
    throw new AppError(400, "This email no have't account");
  }

  const otp = generateOTP();
  otpCache[payload.data.email] = otp; // Store OTP in cache

  // Send OTP via email
  await sendEmail({
    to: payload.data.email,
    subject: "MedBuy OTP Verification",
    text: `Your OTP for verification is ${otp}`,
  });

  payload.res.cookie("otpCache", otpCache, { maxAge: 30000, httpOnly: true });

  return null;
};

const verifyOTP = async (payload: { data: TVerifyOTP; res: Response }) => {
  const { email, otp } = payload.data;

  const user = await User.findOne({ email: payload.data.email });

  if (!user) {
    throw new AppError(400, "This email no have't account");
  }

  // Check if email exists in the cache
  // eslint-disable-next-line no-prototype-builtins
  if (!otpCache.hasOwnProperty(email)) {
    throw new AppError(400, "Email not found");
  }

  // Check if OTP matches the one stored in the cache
  if (otpCache[email] === otp.trim()) {
    await User.updateOne({ email: user.email }, { email_verified: true });
    // Remove OTP from cache after successful verification
    delete otpCache[email];
  } else {
    throw new AppError(400, "Invalid OTP");
  }
};

const loginUser = async (payload: { data: TLoginUser }) => {
  const user = await User.findOne({ email: payload.data.email }).select(
    "+password",
  );

  if (!user) {
    throw new AppError(404, "User not exist!");
  }

  if (!(await checkPasswordIsCorrect(payload.data.password, user.password))) {
    throw new AppError(400, "incorrect password");
  }

  const access_token = createToken(
    { id: user.id, role: user.role },
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  return { access_token };
};

const authServices = {
  registerUser,
  loginUser,
  requestOTP,
  verifyOTP,
};
export default authServices;
