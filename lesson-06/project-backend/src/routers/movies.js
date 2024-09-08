import { Router } from "express";

import {
  getAllMoviesController,
  getMovieByIdController,
  addMovieController,
} from "../controllers/movies.js";

import ctrlWrapper from "../utils/ctrlWpapper.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(getAllMoviesController));

moviesRouter.get("/:id", ctrlWrapper(getMovieByIdController));

moviesRouter.post("/", ctrlWrapper(addMovieController));

export default moviesRouter;
