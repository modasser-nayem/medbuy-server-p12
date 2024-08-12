import { Types } from "mongoose";
import { PRODUCT_STATUS } from "../constant/product";
import productSchemaValidation from "../validation/product";
import { z } from "zod";

export type TProductStatus = keyof typeof PRODUCT_STATUS;

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  meta_key: string;
  price: number;
  discount: number;
  stock_status: boolean;
  status: TProductStatus;
  category: Types.ObjectId;
  photos: string[];
}

export type TCreateProduct = z.infer<
  typeof productSchemaValidation.createProduct
>;

export type TUpdateProduct = z.infer<
  typeof productSchemaValidation.updateProduct
>;
