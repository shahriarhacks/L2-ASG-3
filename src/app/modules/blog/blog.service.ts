import { JwtPayload } from "jsonwebtoken";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { User } from "../auth/auth.model";
import ApplicationError from "../../errors/ApplicationError";
import QueryBuilder from "../../builder/queryBuilder";

const createBlogIntoDB = async (payload: Partial<IBlog>, user: JwtPayload) => {
   const finedUser = await User.findOne({ email: user.email });
   if (!finedUser) {
      throw new ApplicationError(404, "User not found");
   }
   payload.author = finedUser._id;
   const result = (await Blog.create(payload)).populate("author");
   return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
   const blogQuery = new QueryBuilder(Blog.find().populate("author"), query)
      .search(["title", "content"])
      .filter()
      .sort();
   const result = await blogQuery.queryModel;
   return result;
};

const updateBlogIntoDB = async (
   id: string,
   payload: Partial<IBlog>,
   user: JwtPayload,
) => {
   const dbUser = await User.findOne({ email: user.email });
   if (!dbUser) {
      throw new ApplicationError(404, "User not found");
   }
   const blog = await Blog.findById(id);
   if (!blog) {
      throw new ApplicationError(404, "Blog not found");
   }

   if (blog.author?.toString() !== dbUser._id?.toString()) {
      throw new ApplicationError(
         403,
         "You are not authorized to update this blog",
      );
   }

   const result = await Blog.findByIdAndUpdate(id, payload, {
      new: true,
   }).populate("author");
   return result;
};

const deleteBlogFromDB = async (id: string, user: JwtPayload) => {
   const dbUser = await User.findOne({ email: user.email });
   if (!dbUser) {
      throw new ApplicationError(404, "User not found");
   }
   const blog = await Blog.findById(id);
   if (!blog) {
      throw new ApplicationError(404, "Blog not found");
   }

   if (blog.author?.toString() !== dbUser._id?.toString()) {
      throw new ApplicationError(
         403,
         "You are not authorized to delete this blog",
      );
   }

   const result = await Blog.findByIdAndDelete(id);
   return result;
};

export const BlogService = {
   createBlogIntoDB,
   updateBlogIntoDB,
   deleteBlogFromDB,
   getAllBlogsFromDB,
};
