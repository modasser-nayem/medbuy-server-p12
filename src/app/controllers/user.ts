import userServices from "../services/user";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const getUserProfile = catchAsync(async (req, res) => {
  const result = await userServices.getUserProfile({ user: req.user });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved profile",
    data: result,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const result = await userServices.updateUserProfile({
    user: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Update Profile",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsers({
    query: req.query,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all users",
    data: result,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const result = await userServices.updateUserRole({
    admin: req.user,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully update user role",
    data: result,
  });
});

const deleteAccount = catchAsync(async (req, res) => {
  const result = await userServices.deleteAccount({
    user: req.user,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Account Successfully Deleted",
    data: result,
  });
});

const userControllers = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  deleteAccount,
};

export default userControllers;
