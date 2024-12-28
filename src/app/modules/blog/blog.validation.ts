import { z } from "zod";

const createBlog = z.object({
   body: z.object({
      title: z.string().min(3).max(255),
      content: z.string().min(3).max(255),
   }),
});

export const BlogValidation = {
   createBlog,
};
