import { Router } from "express";
import requestValidate from "../middlewares/requestValidation";
import auth from "../middlewares/auth";
import categorySchemaValidation from "../validation/category";
import categoryControllers from "../controllers/category";

const router = Router();

// create category
router.post(
  "/",
  auth(),
  requestValidate(categorySchemaValidation.createCategory),
  categoryControllers.createCategory,
);

// update category
router.put(
  "/:id",
  auth(),
  requestValidate(categorySchemaValidation.updateCategory),
  categoryControllers.updateCategory,
);

// get all category
router.get(
  "/",
  requestValidate(categorySchemaValidation.updateCategory),
  categoryControllers.getAllCategory,
);

// delete category
router.delete("/:id", auth(), categoryControllers.deleteCategory);

const categoryRoutes = router;
export default categoryRoutes;
