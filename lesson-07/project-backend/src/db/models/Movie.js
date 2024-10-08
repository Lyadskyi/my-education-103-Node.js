import { Schema, model } from "mongoose";

import { genreList, releaseYearRegexp } from "../../constants/movies.js";

import { handleSaveError, setUpdateOptions } from "./hooks.js";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title must be exist"],
    },
    director: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: genreList,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
      required: true,
    },
    releaseYear: {
      type: String,
      match: releaseYearRegexp,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

movieSchema.post("save", handleSaveError);

movieSchema.pre("findOneAndUpdate", setUpdateOptions);

movieSchema.post("findOneAndUpdate", handleSaveError);

const MovieCollection = model("movie", movieSchema);

// category => categories
// mouse => mice

export default MovieCollection;
