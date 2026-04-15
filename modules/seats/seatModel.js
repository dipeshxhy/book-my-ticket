import APIError from "../../common/utils/apiError.js";
import { pool } from "../../db/index.js";

const getAllSeats = async () => {
  const sql = "SELECT * FROM seats";
  const result = await pool.query(sql);
  return result.rows;
};
const bookSeat = async (id, name, userId) => {
  const conn = await pool.connect();

  try {
    await conn.query("BEGIN");

    const check = await conn.query(
      "SELECT * FROM seats WHERE id = $1 AND isbooked = 0 FOR UPDATE",
      [id],
    );

    if (check.rowCount === 0) {
      throw APIError.badRequest("Seat already booked");
    }

    const result = await conn.query(
      `UPDATE seats 
       SET isbooked = 1, name = $2, user_id = $3 
       WHERE id = $1 
       RETURNING *`,
      [id, name, userId],
    );

    await conn.query("COMMIT");
    return result.rows[0];
  } catch (err) {
    await conn.query("ROLLBACK");
    throw err;
  } finally {
    conn.release();
  }
};

const removeBookedSeat = async (id, userId) => {
  const conn = await pool.connect();

  try {
    await conn.query("BEGIN");

    const check = await conn.query(
      "SELECT * FROM seats WHERE id = $1 AND isbooked = 1 FOR UPDATE",
      [id],
    );

    if (check.rowCount === 0) {
      throw APIError.badRequest("Seat is not booked");
    }

    const seat = check.rows[0];
    if (String(seat.user_id) !== String(userId)) {
      throw APIError.badRequest("You can remove only your booked seat");
    }

    const result = await conn.query(
      "UPDATE seats SET isbooked = 0, name = NULL, user_id = NULL WHERE id = $1 RETURNING *",
      [id],
    );

    await conn.query("COMMIT");
    return result.rows[0];
  } catch (err) {
    await conn.query("ROLLBACK");
    throw err;
  } finally {
    conn.release();
  }
};
const removeBooking = async (id) => {
  const conn = await pool.connect();

  try {
    await conn.query("BEGIN");

    const check = await conn.query(
      "SELECT * FROM seats WHERE id = $1 AND isbooked = 1 FOR UPDATE",
      [id],
    );

    if (check.rowCount === 0) {
      throw APIError.badRequest("Seat is not booked");
    }

    const result = await conn.query(
      "UPDATE seats SET isbooked = 0, name = NULL, user_id = NULL WHERE id = $1 RETURNING *",
      [id],
    );

    await conn.query("COMMIT");
    return result.rows[0];
  } catch (err) {
    await conn.query("ROLLBACK");
    throw err;
  } finally {
    conn.release();
  }
};

export { getAllSeats, bookSeat, removeBookedSeat, removeBooking };
