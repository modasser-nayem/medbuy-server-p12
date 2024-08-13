import { z } from "zod";

const createVariant = z.object({
  name: z
    .string({ required_error: "name is required" })
    .refine((value) => value !== "", { message: "name is required" }),
  price: z
    .number({ required_error: "price is required" })
    .min(0, { message: "price can't be negative number" }),
  product: z
    .string({ required_error: "product is required" })
    .refine((value) => value !== "", { message: "product id is required" }),
});

const updateVariant = z.object({
  name: z
    .string()
    .refine((value) => value !== "", { message: "name is required" })
    .optional(),
  price: z
    .number()
    .min(0, { message: "price can't be negative number" })
    .optional(),
  product: z
    .string()
    .refine((value) => value !== "", { message: "product id is required" })
    .optional(),
});

const variantSchemaValidation = { createVariant, updateVariant };
export default variantSchemaValidation;
