import { Types } from "mongoose";
import { z } from "zod";
import variantSchemaValidation from "../validation/variant";

export interface IVariantSchema {
  name: string;
  price: number;
  product: Types.ObjectId;
}

export type TCreateVariant = z.infer<
  typeof variantSchemaValidation.createVariant
>;

export type TUpdateVariant = z.infer<
  typeof variantSchemaValidation.updateVariant
>;
