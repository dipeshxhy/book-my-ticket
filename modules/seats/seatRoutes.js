import { Router } from "express";

import * as seatController from "./seatController.js";
import { authenticated } from "../../common/middleware/authenticate.js";

const router = Router();
router.get("/", seatController.getSeats);
router.put("/:id/book", authenticated, seatController.bookSeat);
router.delete(
  "/:id/book",
  authenticated,
  seatController.removeBookedSeatByUser,
);

export default router;
