import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

export const connectDatabase = async () => {
  try {
    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Retrying connection...');
    });

    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Wait up to 30s to find a server
      bufferTimeoutMS: 30000,          // Wait up to 30s for buffered operations
      connectTimeoutMS: 30000,         // TCP connection timeout
      socketTimeoutMS: 60000,          // Socket inactivity timeout
    });
  } catch (error) {
    logger.error(`Failed to connect to MongoDB: ${error.message}`);
    if (env.isProduction) {
      process.exit(1);
    }
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB connection closed.');
  } catch (error) {
    logger.error(`Error disconnecting MongoDB: ${error.message}`);
  }
};
