import mongoose from "mongoose";
import { envs } from "../app/config/envs";

export const connectMongoDB = async () => {
   try {
      const connectionInstance = await mongoose.connect(
         envs.mongo_uri as string,
      );
      console.log(
         `🎉👌 MONGODB Connected Successfully!!✨ with hostname: ${connectionInstance.connection.host}`,
      );
   } catch (error) {
      console.log({ what: `🤦‍♂️ MONGODB Connection ERROR!`, why: error });
      process.exit(1);
   }
};
