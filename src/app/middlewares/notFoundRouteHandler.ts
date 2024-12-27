import { NextFunction, Request, Response } from "express";

export const notFoundRouteHandler = (
   req: Request,
   res: Response,
   _next: NextFunction,
): void => {
   res.status(404).json({
      statusCode: 404,
      success: false,
      message: "API Route Not Found !!",
      error: {
         details: [
            {
               path: req.originalUrl,
               message: `Cannot ${req.method} ${req.originalUrl}`,
            },
         ],
      },
   });
};
