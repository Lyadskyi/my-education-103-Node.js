import mongoose from 'mongoose';

import { env } from '../utils/env.js';

// Dmytro - USER in the MongoDB Project-lesson-04
// G7ir21g1ZGhNSGrT - PASSWORD in the MongoDB Project-lesson-04

export const initMongoDB = async () => {
  try {
    const user = env('MONGODB_USER');
    const password = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');
    const DB_HOST = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(DB_HOST);
    console.log('MongoDB connection successfully');
  } catch (error) {
    console.log('MongoDB connection error', error.message);
    throw error;
  }
};
