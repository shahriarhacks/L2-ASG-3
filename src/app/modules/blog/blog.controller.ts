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
export const BlogController = {
   createBlog,
};
