import { TDetails, TGenericErrorResponse } from "../../types/error";
import extractKeyValue from "../utils/extractKeyValue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const duplicateKeyEntry = (error: any): TGenericErrorResponse => {
   const keyValue = extractKeyValue(error?.message);
   const key = keyValue?.key;
   const value = keyValue?.value;
   const details: TDetails[] = [
      {
         path: key,
         message: `Duplicate key entry: ${value}`,
      },
   ];
   return {
      statusCode: 400,
      message: "Duplicate key entry",
      details,
   };
};
export default duplicateKeyEntry;
