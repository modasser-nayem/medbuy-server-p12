import AppError from "../error/AppError";
import { TCreateCategory, TUpdateCategory } from "../interface/category";
import { Category } from "../models/category.model";

const createCategory = async (payload: { data: TCreateCategory }) => {
  if (await Category.findOne({ slug: payload.data.slug })) {
    throw new AppError(400, "Slug already exist");
  }

  if (await Category.findOne({ name: payload.data.name })) {
    throw new AppError(400, "Slug already exist");
  }

  if (
    payload.data.parent_category &&
    !(await Category.findById(payload.data.parent_category))
  ) {
    throw new AppError(404, "Parent Category not found!");
  }

  const result = Category.create(payload.data);

  return result;
};

const updateCategory = async (payload: {
  categoryId: string;
  data: TUpdateCategory;
}) => {
  if (await Category.findOne({ slug: payload.data.slug })) {
    throw new AppError(400, "Slug already exist");
  }

  const result = await Category.findByIdAndUpdate(
    payload.categoryId,
    payload.data,
    {
      new: true,
      projection: {
        name: 1,
        slug: 1,
        thumbnail: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  );

  if (!result) {
    throw new AppError(404, "Category not found!");
  }

  return result;
};

const getAllCategory = async () => {
  const result = await Category.find(
    {},
    { name: 1, slug: 1, thumbnail: 1, createdAt: 1 },
  ).populate("parent_category", "name slug thumbnail createdAt");

  return result;
};

const deleteCategory = async (payload: { categoryId: string }) => {
  const result = await Category.findByIdAndDelete(payload.categoryId, {
    projection: { name: 1, slug: 1, thumbnail: 1, createdAt: 1 },
  });

  if (!result) {
    throw new AppError(404, "Category not found!");
  }

  return result;
};

const categoryServices = {
  createCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
};

export default categoryServices;
