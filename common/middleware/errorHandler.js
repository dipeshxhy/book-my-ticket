import ApiError from "../utils/apiError.js";

export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    error = new ApiError(
      err.message || "Internal Server Error",
      err.statusCode || 500,
      err.errors || null,
    );
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
    errors: error.errors || null,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};
