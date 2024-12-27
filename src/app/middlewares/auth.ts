/* eslint-disable arrow-body-style */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import ApplicationError from "../errors/ApplicationError";
import { verifyToken } from "../modules/auth/auth.utils";
import { envs } from "../config/envs";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/auth/auth.model";

const auth = (...roles: string[]) => {
   return catchAsync(
      async (req: Request, _res: Response, next: NextFunction) => {
         const authorizationHeader: string = req.headers
            .authorization as string;
         if (!authorizationHeader) {
            throw new ApplicationError(401, "Authorization header missing");
         }

         const token: string = authorizationHeader.split(" ")[1];
         if (!token) {
            throw new ApplicationError(401, "You are not authenticated");
         }

         const decoded = verifyToken(
            token,
            envs.jwt.access.secret as string,
         ) as JwtPayload;
         const { email, role } = decoded;

         const user = await User.findOne({ email });
         if (!user) {
            throw new ApplicationError(401, "You are not authenticated");
         }
         if (user.isBlocked) {
            throw new ApplicationError(401, "You are blocked");
         }
         if (roles.length && !roles.includes(role)) {
            throw new ApplicationError(403, "You are not authorized to access");
         }

         req.user = decoded as JwtPayload; // Assign the user to the request object
         next();
      },
   );
};

export default auth;
