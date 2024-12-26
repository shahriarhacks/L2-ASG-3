import { z } from "zod";

const createUser = z.object({
   body: z.object({
      name: z.string().min(3).max(255),
      email: z.string().email(),
      role: z.enum(["admin", "user"]).default("user"),
      password: z.string().min(6).max(255),
   }),
});

const loginValidation = z.object({
   body: z.object({
      email: z.string().email(),
      password: z.string().min(6).max(255),
   }),
});

export const AuthValidation = {
   createUser,
   loginValidation,
};
