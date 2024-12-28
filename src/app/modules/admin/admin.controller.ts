import catchAsync from "../../utils/catchAsync";
import responder from "../../utils/responder";
import { AdminService } from "./admin.service";

const blockUser = catchAsync(async (req, res) => {
   const { userId } = req.params;
   await AdminService.blockUserByAdminIntoDB(userId);
   responder(res, {
      statusCode: 200,
      success: true,
      message: "User blocked successfully",
   });
});

const deleteBlog = catchAsync(async (req, res) => {
   await AdminService.deleteBlogFromDB(req.params.id);
   responder(res, {
      statusCode: 200,
      success: true,
      message: "Blog deleted successfully",
   });
});

export const AdminController = {
   blockUser,
   deleteBlog,
};
