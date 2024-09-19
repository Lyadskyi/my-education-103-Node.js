import MovieCollection from "../db/models/Movie.js";

import calculatePaginationData from "../utils/calculatePaginationData.js";

import { SORT_ORDER } from "../constants/index.js";

export const getMovies = async ({
  perPage,
  page,
  sortBy = "_id",
  sortOrder = SORT_ORDER[0],
}) => {
  const skip = (page - 1) * perPage;
  const movies = await MovieCollection.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const count = await MovieCollection.find().countDocuments();

  const paginationData = calculatePaginationData({ count, perPage, page });

  return {
    page,
    perPage,
    movies,
    totalItems: count,
    ...paginationData,
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
