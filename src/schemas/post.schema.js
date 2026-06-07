import { z } from "zod";

export const categoryOptions = [
  "Technology",
  "Travel",
  "Education",
  "Lifestyle",
];

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  category: z.enum(categoryOptions, {
    message: "Category is required",
  }),
  content: z.string().trim().min(10, "Content must be at least 10 characters"),
});
