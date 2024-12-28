import { JwtPayload } from "jsonwebtoken";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { User } from "../auth/auth.model";
import ApplicationError from "../../errors/ApplicationError";

const createBlogIntoDB = async (payload: Partial<IBlog>, user: JwtPayload) => {
   const finedUser = await User.findOne({ email: user.email });
   if (!finedUser) {
      throw new ApplicationError(404, "User not found");
   }
   payload.author = finedUser._id;
   const result = (await Blog.create(payload)).populate("author");
   return result;
};

const updateBlogIntoDB = async (id: string, payload: Partial<IBlog>) => {
   const result = await Blog.findByIdAndUpdate(id, payload, {
      new: true,
   }).populate("author");
   return result;
};

const deleteBlogFromDB = async (id: string) => {
   const result = await Blog.findByIdAndDelete(id);
   return result;
};

export const BlogService = {
   createBlogIntoDB,
   updateBlogIntoDB,
   deleteBlogFromDB,
};
