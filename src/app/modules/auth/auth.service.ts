import { IUser } from "./auth.interface";
import { User } from "./auth.model";

const registerUserIntoDB = async (payload: IUser) => {
   const result = await User.create(payload);
   return result;
};

export const AuthService = {
   registerUserIntoDB,
};
