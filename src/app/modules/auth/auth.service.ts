import { IUser } from "./auth.interface";
import { User } from "./auth.model";

const registerUserIntoDB = async (payload: IUser) => {
   const result = await User.create(payload);

   return {
      _id: result._id,
      name: result.name,
      email: result.email,
   };
};

export const AuthService = {
   registerUserIntoDB,
};
