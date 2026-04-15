import APIResponse from "../../common/utils/apiResponse.js";
import * as seatService from "./seatServices.js";

const getSeats = async (req, res) => {
  const result = await seatService.getSeats();
  APIResponse.ok(res, "Seats fetched successfully", result);
};
const bookSeat = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const result = await seatService.bookSeatByUser(id, userId);
  APIResponse.ok(res, "Seat booked successfully", result);
};

const removeBookedSeatByUser = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const result = await seatService.removeBookingByUser(id, userId);
  APIResponse.ok(res, "Booking removed successfully", result);
};
const removedBooking = async (req, res) => {
  const { id } = req.params;
  const result = await seatService.removedBooking(id);
  APIResponse.ok(res, "Booking removed successfully", result);
};

export { getSeats, bookSeat, removeBookedSeatByUser, removedBooking };
