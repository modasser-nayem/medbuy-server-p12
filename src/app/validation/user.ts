import { z } from "zod";

const updateUserProfile = z.object({
  name: z
    .string()
    .refine((value) => value !== "", { message: "name is required" })
    .optional(),
  email: z.string().email({ message: "invalid email address" }).optional(),
  photo: z
    .string()
    .url({ message: "Invalid URL" })
    .refine((value) => value !== "", { message: "photo is required" })
    .optional(),
});

const updateUserRole = z.object({
  userId: z
    .string({ required_error: "userId is required" })
    .refine((value) => value !== "", { message: "userId is required" }),
  role: z.enum(["super_admin", "admin", "user"], {
    required_error: "role is required",
  }),
});

const userSchemaValidation = {
  updateUserProfile,
  updateUserRole,
};
export default userSchemaValidation;
