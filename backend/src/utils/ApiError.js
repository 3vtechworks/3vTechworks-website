export class ApiError extends Error {
  constructor(statusCode, message = 'Something went wrong', errors, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(msg = 'Bad Request', errors) {
    return new ApiError(400, msg, errors);
  }

  static unauthorized(msg = 'Unauthorized') {
    return new ApiError(401, msg);
  }

  static forbidden(msg = 'Forbidden') {
    return new ApiError(403, msg);
  }

  static notFound(msg = 'Resource Not Found') {
    return new ApiError(404, msg);
  }

  static conflict(msg = 'Conflict detected') {
    return new ApiError(409, msg);
  }

  static internal(msg = 'Internal Server Error') {
    return new ApiError(500, msg);
  }
}
