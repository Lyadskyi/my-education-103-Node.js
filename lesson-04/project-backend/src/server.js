import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

/* import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.PORT);
const port = Number(process.env.PORT) || 3000;
*/

import { env } from './utils/env.js';

export const startServer = () => {
  const app = express(); // 1.Функція створює веб-сервер

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(express.json()); // 2.Функція прописує middlewares

  // Routes

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
  });

  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log('Server running on port 3000')); // 3.Функція запускає веб-сервер
};
