import { PRODUCT_STATUS } from "../constant/product";
import AppError from "../error/AppError";
import { TCreateProduct, TUpdateProduct } from "../interface/product";
import { Category } from "../models/category.model";
import Product from "../models/product.model";

const createProduct = async (payload: { data: TCreateProduct }) => {
  if (await Product.findOne({ slug: payload.data.slug })) {
    throw new AppError(400, "Slug already exist!");
  }

  if (!(await Category.findById(payload.data.category))) {
    throw new AppError(404, "Category not found!");
  }

  const result = await Product.create(payload.data);

  return result;
};

const updateProduct = async (payload: {
  productId: string;
  data: TUpdateProduct;
}) => {
  const product = await Product.findById(payload.productId);

  if (!product) {
    throw new AppError(400, "Product not found");
  }

  if (
    payload.data?.slug &&
    (await Product.findOne({
      _id: { $ne: product._id },
      slug: payload.data.slug,
    }))
  ) {
    throw new AppError(400, "Slug already exist!");
  }

  if (
    payload.data?.category &&
    !(await Category.findById(payload.data.category))
  ) {
    throw new AppError(404, "Category not found!");
  }

  const result = await Product.findByIdAndUpdate(product._id, payload.data, {
    new: true,
  });

  return result;
};

const getAllProduct = async (payload: {
  query: { searchTerm?: string; category: string };
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {};

  if (payload.query?.category) {
    filter.category = payload.query.category;
  }
  const result = await Product.find(filter, {
    name: 1,
    slug: 1,
    price: 1,
    discount: 1,
    meta_key: 1,
    stock_status: 1,
    status: 1,
    photos: 1,
    createdAt: 1,
  });

  return result;
};

const getAllProductForUsers = async (payload: {
  query: { searchTerm?: string; category?: string };
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {};

  if (payload.query?.category) {
    filter.category = payload.query.category;
  }

  filter.status = PRODUCT_STATUS.active;

  const result = await Product.find(filter, {
    name: 1,
    slug: 1,
    price: 1,
    discount: 1,
    meta_key: 1,
    stock_status: 1,
    photos: 1,
    createdAt: 1,
  });

  return result;
};

const getSingleProduct = async (payload: { productId: string }) => {
  const product = await Product.findById(payload.productId, {
    __v: 0,
  }).populate("category", "name");

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  return product;
};

const deleteProduct = async (payload: { productId: string }) => {
  const result = await Product.findByIdAndDelete(payload.productId);

  if (!result) {
    throw new AppError(404, "Product not found!");
  }

  return result;
};

const productServices = {
  createProduct,
  updateProduct,
  getAllProduct,
  getAllProductForUsers,
  getSingleProduct,
  deleteProduct,
};
export default productServices;
