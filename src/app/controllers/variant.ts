import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import variantService from "../services/variant";

const createVariant = catchAsync(async (req, res) => {
  const result = await variantService.createVariant({
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Variant Successfully Created",
    data: result,
  });
});

const updateVariant = catchAsync(async (req, res) => {
  const result = await variantService.updateVariant({
    variantId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Variant Successfully Updated",
    data: result,
  });
});

const getAllVariantForAProduct = catchAsync(async (req, res) => {
  const result = await variantService.getAllVariantForAProduct({
    productId: req.params.productId,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved a product variants",
    data: result,
  });
});

const deleteVariant = catchAsync(async (req, res) => {
  const result = await variantService.deleteVariant({
    variantId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Variant Successfully Deleted",
    data: result,
  });
});

const variantController = {
  createVariant,
  updateVariant,
  getAllVariantForAProduct,
  deleteVariant,
};
export default variantController;
