import { Router } from 'express';

import * as movieServices from './services/movies.js';

const moviesRouter = Router();

moviesRouter.get('/', async (req, res) => {
  const data = await movieServices.getAllMovies();

  res.json({
    status: 200,
    message: 'Successfully found movies',
    data,
  });
});

moviesRouter.get('/:id', async (req, res) => {
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

export default moviesRouter;
