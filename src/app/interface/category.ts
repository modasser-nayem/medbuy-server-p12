import { Types } from "mongoose";
import categorySchemaValidation from "../validation/category";
import { z } from "zod";

export interface ICategory {
  name: string;
  slug: string;
  thumbnail: string;
  parent_category: Types.ObjectId;
}

export type TCreateCategory = z.infer<
  typeof categorySchemaValidation.createCategory
>;

export type TUpdateCategory = z.infer<
  typeof categorySchemaValidation.updateCategory
>;
