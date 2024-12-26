import catchAsync from "../../utils/catchAsync";
import responder from "../../utils/responder";
import { AuthService } from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
   const result = await AuthService.registerUserIntoDB(req.body);
   responder(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result,
   });
});

const loginUser = catchAsync(async (req, res) => {
   const result = await AuthService.loginUserFromDB(req.body);
   responder(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully",
      data: result,
   });
});

export const AuthController = {
   registerUser,
   loginUser,
};
