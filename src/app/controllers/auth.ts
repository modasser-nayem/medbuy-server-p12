import authServices from "../services/auth";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const registerUser = catchAsync(async (req, res) => {
  const result = await authServices.registerUser({ data: req.body });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully Register",
    data: result,
  });
});

const requestOTP = catchAsync(async (req, res) => {
  const result = await authServices.requestOTP({ data: req.body, res });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Send OTP in your email",
    data: result,
  });
});

const verifyOTP = catchAsync(async (req, res) => {
  const result = await authServices.verifyOTP({ data: req.body, res });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "OTP verified",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser({ data: req.body });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Login",
    data: result,
  });
});

const authControllers = {
  registerUser,
  loginUser,
  requestOTP,
  verifyOTP,
};
export default authControllers;
