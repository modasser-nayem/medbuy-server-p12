import { Router } from "express";
import requestValidate from "../middlewares/requestValidation";
import userSchemaValidation from "../validation/user";
import userControllers from "../controllers/user";
import auth from "../middlewares/auth";

const router = Router();

// get user profile
router.get("/me", auth(), userControllers.getUserProfile);

// get all users
router.get("/", auth("admin", "super_admin"), userControllers.getAllUsers);

// update user profile
router.put(
  "/me",
  auth(),
  requestValidate(userSchemaValidation.updateUserProfile),
  userControllers.updateUserProfile,
);

// update user role
router.patch(
  "/role",
  auth("super_admin"),
  requestValidate(userSchemaValidation.updateUserRole),
  userControllers.updateUserRole,
);

// delete account
router.delete("/me", auth(), userControllers.deleteAccount);

const userRoutes = router;
export default userRoutes;
