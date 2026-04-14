import jwt from "jsonwebtoken";
import { findUserById } from "../../modules/auth/authModel.js";
import APIError from "../utils/apiError.js";
const authenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw APIError.unauthorized("No token provided, authorization denied");
  }
  try {
    // Verify token and attach user to request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.id);
    if (!user) {
      throw APIError.unauthorized("User not found");
    }
    req.user = decoded;
    next();
  } catch (err) {
    throw APIError.unauthorized("Invalid token or token expired");
  }
};

export { authenticated };
