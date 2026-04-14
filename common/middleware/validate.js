import APIError from "../utils/apiError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        APIError.badRequest(
          "Validation failed",
          result.error.flatten().fieldErrors,
        ),
      );
    }

    req.body = result.data;
    next();
  };
};

export default validate;
