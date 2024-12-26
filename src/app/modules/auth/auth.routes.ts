import { Router } from "express";
import requestValidator from "../../middlewares/requestValidator";
import { UserValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();

router.post(
   "/register",
   requestValidator(UserValidation.createUser),
   AuthController.registerUser,
);

export const AuthRouter = router;
