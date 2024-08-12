import jwt from "jsonwebtoken";
import config from "../config";

import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../interface/user";
import AppError from "../error/AppError";
import { ExtendedJwtPayload } from "../interface";
import { User } from "../models/user.model";

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(401, "You are not authorized!");
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as ExtendedJwtPayload;

    const { role, id } = decoded;
    // checking if the user is exist
    const user = await User.findById(id);

    if (!user) {
      throw new AppError(404, "This account is not found!");
    }

    if (roles.length && !roles.includes(role)) {
      throw new AppError(403, "You don't have permission to access this data!");
    }

    req.user = decoded as ExtendedJwtPayload;
    next();
  });
};

export default auth;
