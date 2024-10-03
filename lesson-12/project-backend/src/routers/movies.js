import { Router } from "express";

import {
  getAllMoviesController,
  getMovieByIdController,
  addMovieController,
  upsertMovieController,
  patchMovieController,
  deleteMovieController,
} from "../controllers/movies.js";

import authenticate from "../middlewares/authenticate.js";
import isValidId from "../middlewares/isValidId.js";
import upload from "../middlewares/upload.js";

import ctrlWrapper from "../utils/ctrlWpapper.js";
import validateBody from "../utils/validatebody.js";

import { movieAddSchema, moviePatchSchema } from "../validation/movies.js";

const moviesRouter = Router();

moviesRouter.use(authenticate);

moviesRouter.get("/", ctrlWrapper(getAllMoviesController));

moviesRouter.get("/:id", isValidId, ctrlWrapper(getMovieByIdController));

// upload.fields([{name: "poster", maxCount: 1}, {name: "subposter", maxCount: 2}])
// upload.array("poster", 8)

moviesRouter.post(
  "/",
  upload.single("poster"),
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
