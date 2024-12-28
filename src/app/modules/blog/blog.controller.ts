import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import responder from "../../utils/responder";
import { BlogService } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
   const blog = await BlogService.createBlogIntoDB(
      req.body,
      req.user as JwtPayload,
   );
   responder(res, {
      statusCode: 201,
      success: true,
      message: "Blog created successfully",
      data: blog,
   });
});

const getAllBlogs = catchAsync(async (req, res) => {
   const result = await BlogService.getAllBlogsFromDB(req.query);
   responder(res, {
      statusCode: 200,
      message: "All blogs fetched successfully",
      success: true,
      data: result,
   });
});

const updateBlog = catchAsync(async (req, res) => {
   const result = await BlogService.updateBlogIntoDB(
      req.params.id,
      req.body,
      req.user as JwtPayload,
   );
   responder(res, {
      statusCode: 200,
      success: true,
      message: "Blog updated successfully",
      data: result,
   });
});

const deleteBlog = catchAsync(async (req, res) => {
   await BlogService.deleteBlogFromDB(req.params.id, req.user as JwtPayload);
   responder(res, {
      statusCode: 200,
      success: true,
      message: "Blog deleted successfully",
   });
});

export const BlogController = {
   createBlog,
   updateBlog,
   deleteBlog,
   getAllBlogs,
};
