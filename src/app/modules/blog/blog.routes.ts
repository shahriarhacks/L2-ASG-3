import { Router } from "express";
import auth from "../../middlewares/auth";
import requestValidator from "../../middlewares/requestValidator";
import { BlogValidation } from "./blog.validation";
import { BlogController } from "./blog.controller";
import { USER_ROLE } from "../../config/users_role";

const router = Router();

router.post(
   "/",
   auth(USER_ROLE.USER),
   requestValidator(BlogValidation.createBlog),
   BlogController.createBlog,
);
router.get("/", BlogController.getAllBlogs);

router.patch(
   "/:id",
   auth(USER_ROLE.USER),
   requestValidator(BlogValidation.updateBlog),
   BlogController.updateBlog,
);
router.delete("/:id", auth(USER_ROLE.USER), BlogController.deleteBlog);

export const BlogRouter = router;
