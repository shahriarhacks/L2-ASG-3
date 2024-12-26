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

export const AuthController = {
   registerUser,
};
