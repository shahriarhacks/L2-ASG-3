import { User } from "../auth/auth.model";
import { Blog } from "../blog/blog.model";

const blockUserByAdminIntoDB = async (id: string) => {
   const result = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true },
   );
   return result;
};
const deleteBlogFromDB = async (id: string) => {
   const result = await Blog.findByIdAndDelete(id);
   return result;
};

export const AdminService = {
   blockUserByAdminIntoDB,
   deleteBlogFromDB,
};
