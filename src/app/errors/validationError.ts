import mongoose from "mongoose";
import { TDetails, TGenericErrorResponse } from "../../types/error";

const validationError = (
   error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
   const details: TDetails[] = Object.values(error.errors).map(
      (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
         path: value.path,
         message: value.message,
      }),
   );
   return {
      statusCode: 400,
      message: "Validation Error",
      details,
   };
};

export default validationError;
