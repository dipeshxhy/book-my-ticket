import jwt from "jsonwebtoken";
import { findUserById } from "../../modules/auth/authModel.js";
import APIError from "../utils/apiError.js";
const authenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw APIError.unauthorized("Authentication token missing");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserById(decoded.id);
    if (!user) {
      throw APIError.unauthorized("Invalid authentication token");
    }

    req.user = user; // better to pass full user
    next();
  } catch (err) {
    throw APIError.unauthorized("Invalid authentication token");
  }
};

const authorized = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw APIError.forbidden(
        "You do not have permission to access this resource",
      );
    }
    next();
  };
};

export { authenticated, authorized };
