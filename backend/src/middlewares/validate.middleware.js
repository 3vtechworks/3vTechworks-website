import { ZodError } from 'zod';
import { ApiError } from '../utils/ApiError.js';

export const validate = (schema) => {
  return async (req, _res, next) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      req.body = parsed.body || req.body;
      req.query = parsed.query || req.query;
      req.params = parsed.params || req.params;
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join('.').replace(/^(body|query|params)\./, ''),
          message: err.message,
        }));
        return next(new ApiError(400, 'Validation Failed', errorMessages));
      }
      return next(error);
    }
  };
};
