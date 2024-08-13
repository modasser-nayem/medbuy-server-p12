import AppError from "../error/AppError";
import { TCreateVariant, TUpdateVariant } from "../interface/variant";
import Product from "../models/product.model";
import Variant from "../models/variant.model";

const createVariant = async (payload: { data: TCreateVariant }) => {
  if (!(await Product.findById(payload.data.product))) {
    throw new AppError(404, "Product not found");
  }

  const result = await Variant.create(payload.data);

  return result;
};

const updateVariant = async (payload: {
  variantId: string;
  data: TUpdateVariant;
}) => {
  if (
    payload.data?.product &&
    !(await Product.findById(payload.data.product))
  ) {
    throw new AppError(404, "Product not found");
  }

  const variant = await Variant.findById(payload.variantId);

  if (!variant) {
    throw new AppError(404, "Variant not found!");
  }

  const result = await Variant.findByIdAndUpdate(variant._id, payload.data, {
    new: true,
    projection: { name: 1, price: 1, product: 1, createdAt: 1 },
  });

  return result;
};

const getAllVariantForAProduct = async (payload: { productId: string }) => {
  if (!(await Product.findById(payload.productId))) {
    throw new AppError(404, "Product not found");
  }

  const result = await Variant.find(
    { product: payload.productId },
    { name: 1, price: 1, product: 1 },
  );

  return result;
};

const deleteVariant = async (payload: { variantId: string }) => {
  const result = await Variant.findByIdAndDelete(payload.variantId);

  if (!result) {
    throw new AppError(404, "Variant not found!");
  }
};

const variantService = {
  createVariant,
  updateVariant,
  getAllVariantForAProduct,
  deleteVariant,
};

export default variantService;
