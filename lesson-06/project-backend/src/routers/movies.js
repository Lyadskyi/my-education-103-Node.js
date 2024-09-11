import { Router } from "express";

import {
  getAllMoviesController,
  getMovieByIdController,
  addMovieController,
  upsertMovieController,
  patchMovieController,
  deleteMovieController,
} from "../controllers/movies.js";

import ctrlWrapper from "../utils/ctrlWpapper.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(getAllMoviesController));

moviesRouter.get("/:id", ctrlWrapper(getMovieByIdController));

moviesRouter.post("/", ctrlWrapper(addMovieController));

moviesRouter.put("/:id", ctrlWrapper(upsertMovieController));

moviesRouter.patch("/:id", ctrlWrapper(patchMovieController));

moviesRouter.delete("/:id", ctrlWrapper(deleteMovieController));

export default moviesRouter;
