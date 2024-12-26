export interface IResponder<T> {
   statusCode: number;
   success: boolean;
   message?: string;
   data?: T;
}
