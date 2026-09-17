import mongoose from 'mongoose';
import { ApiResponse } from '../utils/ApiResponse.js';

export class HealthController {
  static check = (_req, res) => {
    const mongoStatusMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    const status = {
      status: 'UP',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: {
        status: mongoStatusMap[mongoose.connection.readyState] || 'unknown',
        readyState: mongoose.connection.readyState,
      },
      environment: process.env.NODE_ENV || 'development',
    };

    res.status(200).json(ApiResponse.success(status, 'Service is healthy'));
  };
}
