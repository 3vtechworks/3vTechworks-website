import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/db.js';
import { logger } from './utils/logger.js';

let server;

const startServer = async () => {
  // Connect to MongoDB
  await connectDatabase();

  // Start listening
  server = app.listen(env.PORT, () => {
    logger.info(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    logger.info(`👉 Health check: http://localhost:${env.PORT}/api/v1/health`);
  });

  const handleExit = async (signal) => {
    logger.info(`Received ${signal}. Gracefully shutting down...`);
    if (server) {
      server.close(async () => {
        logger.info('HTTP server closed.');
        await disconnectDatabase();
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  };

  process.on('SIGTERM', () => handleExit('SIGTERM'));
  process.on('SIGINT', () => handleExit('SIGINT'));

  process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled Rejection: ${reason.message}`, { stack: reason.stack });
  });

  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`, { stack: error.stack });
    process.exit(1);
  });
};

startServer();
