class APIError extends Error {
  constructor(message, statusCode, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
  static badRequest(message, errors = null) {
    return new APIError(message, 400, errors);
  }
  static notFound(message) {
    return new APIError(message, 404);
  }
  static conflict(message) {
    return new APIError(message, 409);
  }
  static unauthorized(message) {
    return new APIError(message, 401);
  }
  static internal(message) {
    return new APIError(message, 500);
  }
}

export default APIError;
