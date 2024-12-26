import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (
   jwtPayload: { email: string; role: string },
   secret: string,
   expiresIn: string,
) => jwt.sign(jwtPayload, secret, { expiresIn });

export const verifyToken = (token: string, secret: string) =>
   jwt.verify(token, secret) as JwtPayload;
