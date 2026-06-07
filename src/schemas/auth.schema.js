import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Email is invalid"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z.string().trim().email("Email is invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
