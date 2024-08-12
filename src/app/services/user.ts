import { USER_ROLE } from "../constant/user";
import AppError from "../error/AppError";
import { ExtendedJwtPayload } from "../interface";
import { TUpdateUserProfile, TUpdateUserRole } from "../interface/user";
import { User } from "../models/user.model";

const getUserProfile = async (payload: { user: ExtendedJwtPayload }) => {
  const { id } = payload.user;

  const user = await User.findById(id, {
    name: 1,
    email: 1,
    photo: 1,
    role: 1,
    createdAt: 1,
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};

const updateUserProfile = async (payload: {
  user: ExtendedJwtPayload;
  data: TUpdateUserProfile;
}) => {
  const { id } = payload.user;

  const user = await User.findById(id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (payload.data?.email) {
    const isEmailExist = await User.findOne({ email: payload.data.email });

    if (isEmailExist) {
      throw new AppError(400, "This email already exist!");
    }
  }

  const result = await User.findByIdAndUpdate(user._id, payload.data, {
    projection: { name: 1, email: 1, photo: 1, role: 1, createdAt: 1 },
    new: true,
  });

  return result;
};

const getAllUsers = async (payload: { query?: { role?: string } }) => {
  const filter = payload?.query?.role ? { role: payload.query.role } : {};

  const users = await User.find(filter, {
    name: 1,
    photo: 1,
    email: 1,
    role: 1,
    createdAt: 1,
  });

  return users;
};

const updateUserRole = async (payload: {
  admin: ExtendedJwtPayload;
  data: TUpdateUserRole;
}) => {
  const user = await User.findById(payload.data.userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.id === payload.admin.id) {
    throw new AppError(403, "You can't update own role");
  }

  if (user.role === USER_ROLE.super_admin) {
    throw new AppError(403, "You can't update super admin role");
  }

  await User.updateOne({ _id: user.id }, { role: payload.data.role });

  return null;
};

const deleteAccount = async (payload: { user: ExtendedJwtPayload }) => {
  const user = await User.findById(payload.user.id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  await User.deleteOne({ _id: user.id });

  return null;
};

const userServices = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  deleteAccount,
};

export default userServices;
