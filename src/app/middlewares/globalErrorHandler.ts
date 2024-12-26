import { NextFunction, Request, Response } from "express";
import { envs } from "../config/envs";
import { TDetails } from "../../types/error";

const globalErrorHandler = (
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   error: any,
   _req: Request,
   res: Response,
   _next: NextFunction,
) => {
   let statusCode = error.statusCode || 500;
   let message = error.message || "Something went wrong!";
   let details: TDetails[] = [
      {
         path: "error",
         message: "Something went wrong!",
      },
   ];

   if (error instanceof Error) {
      message = error.message;
      details = [
         {
            path: "error",
            message: error.message,
         },
      ];
   }

   res.status(statusCode).json({
      success: false,
      message,
      details,
      // error,
      stack: envs.env === "development" ? error.stack : "🥞",
   });
};

export default globalErrorHandler;
