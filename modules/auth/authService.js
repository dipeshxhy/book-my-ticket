import { findUserByEmail } from "./authModel.js";

const register = async ({ name, email, password }) => {
  // check if user already exists
  const existingUser = await findUserByEmail(email);
};
