import { envs } from "../../config/envs";
import ApplicationError from "../../errors/ApplicationError";
import { IUser } from "./auth.interface";
import { User } from "./auth.model";
import { createToken } from "./auth.utils";

const registerUserIntoDB = async (payload: IUser) => {
   const result = await User.create(payload);

   return {
      _id: result._id,
      name: result.name,
      email: result.email,
   };
};

const loginUserFromDB = async (payload: {
   email: string;
   password: string;
}) => {
   const user = await User.findOne({ email: payload.email }).select(
      "+password",
   );
   if (!user) {
      throw new ApplicationError(404, "Invalid user email");
   }

   if (user.isBlocked) {
      throw new ApplicationError(403, "You are now blocked");
   }

   if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
      throw new ApplicationError(403, "Invalid password");
   }

   const jwtPayload = {
      email: user.email,
      role: user.role,
   };

   const accessToken = createToken(
      jwtPayload,
      envs.jwt.access.secret as string,
      envs.jwt.access.expiry as string,
   );
   const refreshToken = createToken(
      jwtPayload,
      envs.jwt.refresh.secret as string,
      envs.jwt.refresh.expiry as string,
   );
   return { accessToken, refreshToken };
};

export const AuthService = {
   registerUserIntoDB,
   loginUserFromDB,
};
