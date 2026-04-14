import { pool } from "../../db/index.js";

const createUser = async (name, email, password) => {
  const sql =
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
  const result = await pool.query(sql, [name, email, password]);
  return result.rows[0];
};
const findUserByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = $1";
  const result = await pool.query(sql, [email]);
  return result.rows[0];
};

export { createUser, findUserByEmail };
