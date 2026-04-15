import { z } from "zod";

const registerUserSchema = z.object({
  first_name: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .nonempty("First name is required"),
  last_name: z.string().optional(),
  email: z
    .string() // ✅ REQUIRED
    .nonempty("Email is required") // ✅ REQUIRED
    .email("Invalid email address"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const loginUserSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export { registerUserSchema, loginUserSchema };
