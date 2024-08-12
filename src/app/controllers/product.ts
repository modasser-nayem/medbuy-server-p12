import productServices from "../services/product";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const createProduct = catchAsync(async (req, res) => {
  const result = await productServices.createProduct({
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully create new product",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const result = await productServices.updateProduct({
    productId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Updated",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await productServices.getAllProduct({
    query: req.query,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all product",
    data: result,
  });
});

const getAllProductForUsers = catchAsync(async (req, res) => {
  const result = await productServices.getAllProductForUsers({
    query: req.query,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all product",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await productServices.getSingleProduct({
    productId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved product",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const result = await productServices.deleteProduct({
    productId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Deleted",
    data: result,
  });
});

const productController = {
  createProduct,
  updateProduct,
  getAllProduct,
  getAllProductForUsers,
  getSingleProduct,
  deleteProduct,
};

export default productController;
