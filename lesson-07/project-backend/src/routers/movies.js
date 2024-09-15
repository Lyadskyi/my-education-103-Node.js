import { Router } from "express";

import {
  getAllMoviesController,
  getMovieByIdController,
  addMovieController,
  upsertMovieController,
  patchMovieController,
  deleteMovieController,
} from "../controllers/movies.js";

import isValidId from "../middlewares/isValidId.js";

import ctrlWrapper from "../utils/ctrlWpapper.js";
import validateBody from "../utils/validatebody.js";

import { movieAddSchema, moviePatchSchema } from "../validation/movies.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(getAllMoviesController));

moviesRouter.get("/:id", isValidId, ctrlWrapper(getMovieByIdController));

moviesRouter.post(
  "/",
  validateBody(movieAddSchema),
  ctrlWrapper(addMovieController),
);

moviesRouter.put(
  "/:id",
  isValidId,
  validateBody(movieAddSchema),
  ctrlWrapper(upsertMovieController),
);

moviesRouter.patch(
  "/:id",
  isValidId,
  validateBody(moviePatchSchema),
  ctrlWrapper(patchMovieController),
);

moviesRouter.delete("/:id", isValidId, ctrlWrapper(deleteMovieController));

export default moviesRouter;
