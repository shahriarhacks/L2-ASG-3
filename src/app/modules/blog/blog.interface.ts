import { Types } from "mongoose";
import { IUser } from "../auth/auth.interface";

export interface IBlog {
   title: string;
   content: string;
   author: Types.ObjectId | IUser;
   isPublished: boolean;
}
