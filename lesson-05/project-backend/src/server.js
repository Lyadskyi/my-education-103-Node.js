import express from "express";
import cors from "cors";
import pino from "pino-http";

/* import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.PORT);
const port = Number(process.env.PORT) || 3000;
*/

import { env } from "./utils/env.js";

import moviesRouter from "./routers/movies.js";

export const startServer = () => {
  const app = express(); // 1.Функція створює веб-сервер

  const logger = pino({
    transport: {
      target: "pino-pretty",
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(express.json()); // 2.Функція прописує middlewares

  app.use("/movies", moviesRouter);

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  app.use((error, req, res, next) => {
    const { status = 500, message } = error;
    res.status(status).json({
      message,
    });
  });

  const port = Number(env("PORT", 3000));

  app.listen(port, () => console.log("Server running on port 3000")); // 3.Функція запускає веб-сервер
};
