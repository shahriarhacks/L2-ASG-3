import { Response } from "express";
import { IResponder } from "../../types/response";

const responder = <T>(res: Response, data: IResponder<T>) =>
   res.status(data.statusCode).json({
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: data.data,
   });

export default responder;