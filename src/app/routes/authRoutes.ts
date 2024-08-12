import { Router } from "express";
import requestValidate from "../middlewares/requestValidation";
import authSchemaValidation from "../validation/auth";
import authControllers from "../controllers/auth";

const router = Router();

// register user
router.post(
  "/register",
  requestValidate(authSchemaValidation.registerUser),
  authControllers.registerUser,
);

// request OTP
router.post(
  "/request-otp",
  requestValidate(authSchemaValidation.requestOTP),
  authControllers.requestOTP,
);

// verify OTP
router.post(
  "/verify-otp",
  requestValidate(authSchemaValidation.verifyOTP),
  authControllers.verifyOTP,
);

// login user
router.post(
  "/login",
  requestValidate(authSchemaValidation.loginUser),
  authControllers.loginUser,
);

const authRoutes = router;
export default authRoutes;
