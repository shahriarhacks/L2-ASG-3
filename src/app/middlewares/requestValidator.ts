import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const requestValidator =
   (schema: AnyZodObject) =>
   async (req: Request, _res: Response, next: NextFunction) => {
      try {
         // validation check
         //if everything alright next() ->
         await schema.parseAsync({
            body: req.body,
         });

         next();
      } catch (err) {
         next(err);
      }
   };

export default requestValidator;
