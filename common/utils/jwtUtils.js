import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// create JWT token
const createJWTToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
export { comparePassword, createJWTToken };
