import { Server } from "http";
import app from "./app";
import { envs } from "./app/config/envs";
import { connectMongoDB } from "./connection/mongo";

let server: Server;

(async function runner() {
   try {
      await connectMongoDB().catch((error) =>
         console.log({ what: `🤦‍♂️ MONGODB Connection Error`, why: error }),
      );
      server = app.listen(envs.port, () => {
         console.log({
            what: `🎉✨ Server Running on PORT: ${envs.port}`,
            where: `http://localhost:${envs.port}`,
         });
      });

      server.on("error", (error) => {
         console.log({
            what: `🤦‍♂️ SERVER failed to start for error`,
            why: error,
         });
         process.exit(1);
      });
   } catch (error) {
      console.log({
         what: `🤦‍♂️ SERVER or DATABASE failed to start with some error!`,
         why: error,
      });
      process.exit(1);
   }
})();

process.on("unhandledRejection", () => {
   console.log("🤦‍♂️ Sheet unhandledRejection detected! Shutting down...");
   if (server) {
      server.close(() => {
         process.exit(1);
      });
   }
   process.exit(1);
});

process.on("uncaughtException", () => {
   console.log("🤦‍♀️ Sheet uncaughtException detected! Shutting down...");
   process.exit(1);
});
