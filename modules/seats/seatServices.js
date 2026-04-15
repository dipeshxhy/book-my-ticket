import { findUserById } from "../auth/authModel.js";
import {
  bookSeat,
  getAllSeats,
  removeBookedSeat,
  removeBooking,
} from "./seatModel.js";

const getSeats = async () => {
  const result = await getAllSeats();
  return result;
};
const bookSeatByUser = async (id, userId) => {
  const user = await findUserById(userId);
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
  const name = fullName || user.first_name;

  return await bookSeat(id, name, userId);
};

const removeBookingByUser = async (seatId, userId) => {
  return await removeBookedSeat(seatId, userId);
};

const removedBooking = async (seatId) => {
  return await removeBooking(seatId);
};
export { getSeats, bookSeatByUser, removeBookingByUser, removedBooking };
