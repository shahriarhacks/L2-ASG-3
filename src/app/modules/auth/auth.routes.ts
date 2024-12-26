import { Router } from "express";
import requestValidator from "../../middlewares/requestValidator";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
   "/register",
   requestValidator(AuthValidation.createUser),
   AuthController.registerUser,
);

router.post(
   "/login",
   requestValidator(AuthValidation.loginValidation),
   AuthController.loginUser,
);

export const AuthRouter = router;
