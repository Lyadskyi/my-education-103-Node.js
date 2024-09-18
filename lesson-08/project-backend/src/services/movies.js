import MovieCollection from "../db/models/Movie.js";

export const getMovies = async ({ perPage, page }) => {
  const skip = (page - 1) * perPage;
  const movies = await MovieCollection.find().skip(skip).limit(perPage);
  const count = await MovieCollection.find().countDocuments();

  return {
    movies,
    totalItems: count,
  };
};

export const getMovieById = (id) => MovieCollection.findById(id);

export const createMovie = (payload) => MovieCollection.create(payload);

export const updateMovie = async (filter, data, options = {}) => {
  const rawResult = await MovieCollection.findOneAndUpdate(filter, data, {
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;
  return {
    data: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteMovie = (filter) => MovieCollection.findOneAndDelete(filter);
