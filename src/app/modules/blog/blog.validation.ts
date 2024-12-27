import { z } from "zod";

const createBlog = z.object({
   body: z.object({
      title: z.string().min(3).max(255),
      content: z.string().min(3).max(255),
      author: z.string().min(12).max(12),
      isPublished: z.boolean().default(true),
   }),
});

export const BlogValidation = {
   createBlog,
};
