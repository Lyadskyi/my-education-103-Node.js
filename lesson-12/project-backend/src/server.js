import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

/* import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.PORT);
const port = Number(process.env.PORT) || 3000;
*/

import { env } from "./utils/env.js";

import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
// import logger from "./middlewares/logger.js";

import authRouter from "./routers/auth.js";
import moviesRouter from "./routers/movies.js";

export const startServer = () => {
  const app = express(); // 1.Функція створює веб-сервер

  // app.use(logger);
  app.use(cors());
  app.use(express.json()); // 2.Функція прописує middlewares
  app.use(cookieParser());

  app.use("/auth", authRouter);
  app.use("/movies", moviesRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(env("PORT", 3000));

  app.listen(port, () => console.log("Server running on port 3000")); // 3.Функція запускає веб-сервер
};
