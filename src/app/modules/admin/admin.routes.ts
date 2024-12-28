import { Router } from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../config/users_role";

const router = Router();

router.patch(
   "/users/:userId/block",
   auth(USER_ROLE.ADMIN),
   AdminController.blockUser,
);

router.delete("/blogs/:id", auth(USER_ROLE.ADMIN), AdminController.deleteBlog);

export const AdminRouter = router;
