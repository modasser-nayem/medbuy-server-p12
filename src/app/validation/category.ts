import { z } from "zod";

const createCategory = z.object({
  name: z
    .string({ required_error: "name is required" })
    .refine((value) => value !== "", { message: "name is required" }),
  slug: z
    .string({ required_error: "slug is required" })
    .refine((value) => value !== "", { message: "slug is required" }),
  parent_category: z.string().optional(),
  thumbnail: z
    .string()
    .url({ message: "Invalid URL" })
    .refine((value) => value !== "", { message: "thumbnail is required" })
    .optional(),
});

const updateCategory = z.object({
  name: z
    .string()
    .refine((value) => value !== "", { message: "name is required" })
    .optional(),
  slug: z.string().optional(),
  parent_category: z.string().optional(),
  thumbnail: z
    .string()
    .url({ message: "Invalid URL" })
    .refine((value) => value !== "", { message: "thumbnail is required" })
    .optional(),
});

const categorySchemaValidation = {
  createCategory,
  updateCategory,
};

export default categorySchemaValidation;
