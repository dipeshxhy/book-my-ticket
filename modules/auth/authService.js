import bcrypt from "bcryptjs";
import APIError from "../../common/utils/apiError.js";
import { createUser, findUserByEmail } from "./authModel.js";

const register = async ({ name, email, password }) => {
  // check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw APIError.conflict("User already exists with this email");
  }
  // create user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, hashedPassword);
  return user;
};

export { register };
