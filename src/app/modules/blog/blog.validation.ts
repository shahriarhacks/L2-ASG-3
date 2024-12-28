import { z } from "zod";

const createBlog = z.object({
   body: z.object({
      title: z.string().min(3).max(255),
      content: z.string().min(3),
      isPublished: z.boolean().default(true),
   }),
});
const updateBlog = z.object({
   body: z.object({
      title: z.string().min(3).max(255).optional(),
      content: z.string().min(3).optional(),
      isPublished: z.boolean().optional(),
   }),
});

export const BlogValidation = {
   createBlog,
   updateBlog,
};
