import mongoose from "mongoose";
import { TDetails, TGenericErrorResponse } from "../../types/error";

const castErrorHandler = (
   error: mongoose.Error.CastError,
): TGenericErrorResponse => {
   const details: TDetails[] = [
      {
         path: error.path,
         message: error.message,
      },
   ];
   return {
      statusCode: 400,
      message: "Invalid mongoDB ID",
      details,
   };
};

export default castErrorHandler;
