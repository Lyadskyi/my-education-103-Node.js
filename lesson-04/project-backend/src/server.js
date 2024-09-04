import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import * as movieServices from './services/movies.js';

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

  app.get('/movies', async (req, res) => {
    const data = await movieServices.getAllMovies();

    res.json({
      status: 200,
      message: 'Successfully found movies',
      data,
    });
  });

  app.get('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const data = await movieServices.getMovieById(id);

    if (!data) {
      return res.status(404).json({
        message: `Movie with id=${id} not found`,
      });
    }

    res.json({
      status: 200,
      message: `Movie with ${id} successfully find`,
      data,
    });
  });

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
