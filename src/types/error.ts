export type TDetails = {
   path: string | number;
   message: string;
};
export type TGenericErrorResponse = {
   statusCode: number;
   message: string;
   details: TDetails[];
};
