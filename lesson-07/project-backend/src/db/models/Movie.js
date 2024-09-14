import { Schema, model } from "mongoose";

import { genreList } from "../../constants/movies.js";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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
  },
  { versionKey: false, timestamps: true },
);

const MovieCollection = model("movie", movieSchema);

// category => categories
// mouse => mice

export default MovieCollection;
