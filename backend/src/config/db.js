import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

let cached = global._mongooseConnection;

if (!cached) {
  cached = global._mongooseConnection = { conn: null, promise: null };
}

export const connectDatabase = async () => {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!env.MONGO_URI) {
      const err = new Error('MONGO_URI environment variable is not defined!');
      logger.error(err.message);
      throw err;
    }

    const opts = {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    logger.info('Initiating MongoDB connection...');
    cached.promise = mongoose
      .connect(env.MONGO_URI, opts)
      .then((m) => {
        logger.info('MongoDB connected successfully');
        return m;
      })
      .catch((err) => {
        cached.promise = null;
        logger.error(`Failed to connect to MongoDB: ${err.message}`);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    logger.info('MongoDB connection closed.');
  } catch (error) {
    logger.error(`Error disconnecting MongoDB: ${error.message}`);
  }
};

