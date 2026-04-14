import bcrypt from "bcryptjs";
import APIError from "../../common/utils/apiError.js";
import { createUser, findUserByEmail, findUserById } from "./authModel.js";
import {
  comparePassword,
  createJWTToken,
} from "../../common/utils/jwtUtils.js";

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

//login
const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw APIError.unauthorized("Invalid email or password");
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw APIError.unauthorized("Invalid email or password");
  }
  // create JWT token and return
  const token = createJWTToken({ id: user.id, email: user.email });

  const userObj = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  return { user: userObj, token };
};

const getMe = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw APIError.notFound("User not found");
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
export { register, login, getMe };
