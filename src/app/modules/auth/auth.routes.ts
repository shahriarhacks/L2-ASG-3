import { Router } from "express";
import requestValidator from "../../middlewares/requestValidator";
import { UserValidation } from "./auth.validation";

const router = Router();

router.post("/create", requestValidator(UserValidation.createUser));

export const AuthRouter = router;
