import pg from "pg";

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
const useSsl =
  process.env.DB_SSL === "true" ||
  (hasDatabaseUrl && process.env.DB_SSL !== "false");

const poolConfig = hasDatabaseUrl
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: useSsl ? { rejectUnauthorized: false } : false,
      max: Number(process.env.DB_POOL_MAX || 20),
      connectionTimeoutMillis: Number(
        process.env.DB_CONNECTION_TIMEOUT_MS || 5000,
      ),
      idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS || 30000),
    }
  : {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 5432),
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DB_NAME || "book_my_show",
      ssl: useSsl ? { rejectUnauthorized: false } : false,
      max: Number(process.env.DB_POOL_MAX || 20),
      connectionTimeoutMillis: Number(
        process.env.DB_CONNECTION_TIMEOUT_MS || 5000,
      ),
      idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS || 30000),
    };

export const pool = new pg.Pool(poolConfig);

export const connectDb = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Connected to the database");
  } catch (err) {
    console.log("Error connecting to the database", err);
  }
};
