import pg from "pg";

export const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "book_my_show",
  max: 20,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

export const connectDb = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Connected to the database");
  } catch (err) {
    console.log("Error connecting to the database", err);
  }
};
