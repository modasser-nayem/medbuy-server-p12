import { z } from "zod";

const createProduct = z.object({
  name: z
    .string({ required_error: "name is required" })
    .refine((value) => value !== "", { message: "name is required" }),
  slug: z
    .string({ required_error: "slug is required" })
    .refine((value) => value !== "", { message: "slug is required" }),
  description: z
    .string({ required_error: "description is required" })
    .refine((value) => value !== "", { message: "description is required" }),
  meta_key: z
    .string({ required_error: "meta_key is required" })
    .refine((value) => value !== "", { message: "meta key is required" }),
  price: z
    .number({ required_error: "price is required" })
    .min(0, { message: "price can't be negative number" }),
  discount: z
    .number()
    .min(0, { message: "discount can't be negative number" })
    .optional(),
  status: z.enum(["active", "inactive"]).optional(),
  category: z
    .string({ required_error: "category is required" })
    .refine((value) => value !== "", { message: "category is required" }),
  photos: z.array(
    z
      .string()
      .refine((value) => value !== "", { message: "photo url can't be empty" }),
  ),
});

const updateProduct = z.object({
  name: z
    .string()
    .refine((value) => value !== "", { message: "name is required" })
    .optional(),
  slug: z
    .string()
    .refine((value) => value !== "", { message: "slug is required" })
    .optional(),
  description: z
    .string()
    .refine((value) => value !== "", { message: "description is required" })
    .optional(),
  meta_key: z
    .string()
    .refine((value) => value !== "", { message: "meta key is required" })
    .optional(),
  price: z
    .number()
    .min(0, { message: "price can't be negative number" })
    .optional(),
  discount: z
    .number()
    .min(0, { message: "discount can't be negative number" })
    .optional(),
  stock_status: z.boolean().optional(),
  status: z.enum(["active", "inactive"]).optional(),
  category: z
    .string()
    .refine((value) => value !== "", { message: "category is required" })
    .optional(),
  photos: z
    .array(
      z
        .string()
        .refine((value) => value !== "", {
          message: "photo url can't be empty",
        })
        .optional(),
    )
    .optional(),
});

const productSchemaValidation = {
  createProduct,
  updateProduct,
};

export default productSchemaValidation;
