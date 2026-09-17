import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export const errorHandler = (err, req, res, _next) => {
  let error = err;

  // If not instance of ApiError, wrap it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, undefined, err.stack);
  }

  // Log error
  if (error.statusCode >= 500) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`, {
      stack: error.stack,
    });
  } else {
    logger.warn(`[${req.method}] ${req.originalUrl} - ${error.message}`);
  }

  const responsePayload = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
  };

  if (error.errors && error.errors.length > 0) {
    responsePayload.errors = error.errors;
  }

  if (env.isDevelopment) {
    responsePayload.stack = error.stack;
  }

  res.status(error.statusCode).json(responsePayload);
};
