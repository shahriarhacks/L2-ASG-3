import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const envs = {
   env: process.env.NODE_ENV,
   port: process.env.PORT,
   mongo_uri: process.env.MONGO_URI,
   bcrypt_salt: process.env.BCRYPT_SALT,
   jwt: {
      access: {
         secret: process.env.JWT_ACCESS_SECRET,
         expiry: process.env.JWT_ACCESS_EXPIRATION,
      },
      refresh: {
         secret: process.env.JWT_REFRESH_SECRET,
         expiry: process.env.JWT_REFRESH_EXPIRATION,
      },
   },
} as const;
