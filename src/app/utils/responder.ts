import { Response } from "express";
import { IResponder } from "../../types/response";

const responder = <T>(res: Response, data: IResponder<T>) =>
   res.status(data.statusCode).json({
      success: data.success,
      message: data.message,
      statusCode: data.statusCode,
      data: data.data,
   });

export default responder;
