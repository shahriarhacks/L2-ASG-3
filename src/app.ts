import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { notFoundRouteHandler } from "./app/middlewares/notFoundRouteHandler";
import router from "./app/routes";
import auth from "./app/middlewares/auth";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//Application routes
app.use("/api", router);

app.get("/api", auth("user"), (req, res) => {
   res.send("Hello World");
});

//Global Error Handler
app.use(globalErrorHandler);
//Not Found Route
app.use("*", notFoundRouteHandler);

export default app;
