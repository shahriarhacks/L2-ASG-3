import { ZodError, ZodIssue } from "zod";
import { TDetails, TGenericErrorResponse } from "../../types/error";

const zodErrorHandler = (error: ZodError): TGenericErrorResponse => {
   const details: TDetails[] = error.errors.map((err: ZodIssue) => ({
      path: err.path[err.path.length - 1],
      message: err.message,
   }));
   return {
      statusCode: 400,
      message: "Validation error",
      details,
   };
};
export default zodErrorHandler;
