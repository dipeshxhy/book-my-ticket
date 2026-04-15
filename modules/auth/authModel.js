import { pool } from "../../db/index.js";

const createUser = async (first_name, last_name, email, password) => {
  const sql =
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
  const result = await pool.query(sql, [
    first_name,
    last_name,
    email,
    password,
  ]);
  return result.rows[0];
};
const findUserByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = $1";
  const result = await pool.query(sql, [email]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const sql = "SELECT * FROM users WHERE id = $1";
  const result = await pool.query(sql, [id]);
  return result.rows[0];
};

//admin
const findAllUsers = async () => {
  const sql = "SELECT id, first_name, last_name, email FROM users";
  const result = await pool.query(sql);
  return result.rows;
};
const removeUser = async (id) => {
  const sql = "DELETE FROM users WHERE id = $1 RETURNING *";
  const result = await pool.query(sql, [id]);
  return result.rows[0];
};
export { createUser, findUserByEmail, findUserById, findAllUsers, removeUser };
