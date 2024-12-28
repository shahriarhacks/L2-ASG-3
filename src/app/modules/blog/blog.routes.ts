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

export const BlogRouter = router;
