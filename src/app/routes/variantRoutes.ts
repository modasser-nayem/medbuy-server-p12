import { Router } from "express";
import requestValidate from "../middlewares/requestValidation";
import auth from "../middlewares/auth";
import variantSchemaValidation from "../validation/variant";
import variantController from "../controllers/variant";

const router = Router();

// create variant
router.post(
  "/",
  auth("admin", "super_admin"),
  requestValidate(variantSchemaValidation.createVariant),
  variantController.createVariant,
);

// update variant
router.put(
  "/:id",
  auth("admin", "super_admin"),
  requestValidate(variantSchemaValidation.updateVariant),
  variantController.updateVariant,
);

// get all variant for a product
router.get("/:productId", variantController.getAllVariantForAProduct);

// delete variant
router.delete(
  "/:id",
  auth("admin", "super_admin"),
  variantController.deleteVariant,
);

const variantRoutes = router;
export default variantRoutes;
