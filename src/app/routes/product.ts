import { Router } from "express";
import auth from "../middlewares/auth";
import requestValidate from "../middlewares/requestValidation";
import productSchemaValidation from "../validation/product";
import productController from "../controllers/product";

const router = Router();

// create new product
router.post(
  "/",
  auth("admin", "super_admin"),
  requestValidate(productSchemaValidation.createProduct),
  productController.createProduct,
);

// update product
router.put(
  "/:id",
  auth("admin", "super_admin"),
  requestValidate(productSchemaValidation.updateProduct),
  productController.updateProduct,
);

// get all product
router.get("/", auth("admin", "super_admin"), productController.getAllProduct);

// get all product for users
router.get("/users", productController.getAllProductForUsers);

// get single product
router.get("/:id", productController.getSingleProduct);

// delete product
router.delete(
  "/:id",
  auth("admin", "super_admin"),
  productController.deleteProduct,
);

const productRoutes = router;
export default productRoutes;
