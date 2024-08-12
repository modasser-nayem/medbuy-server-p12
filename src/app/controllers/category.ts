import categoryServices from "../services/category";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategory({
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully Created",
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.updateCategory({
    categoryId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Updated",
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategory();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all category",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.deleteCategory({
    categoryId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Deleted",
    data: result,
  });
});

const categoryControllers = {
  createCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
};

export default categoryControllers;
