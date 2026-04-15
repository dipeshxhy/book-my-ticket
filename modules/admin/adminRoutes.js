import { Router } from "express";
import * as authController from "../auth/authController.js";
import * as seatController from "../seats/seatController.js";

const router = Router();

//admin routes
router.get("/users", authController.fetchAllUsers);
router.get("/users/:id", authController.getOneUser);
router.delete("/users/:id", authController.removeUser);
router.delete("/seats/:id", seatController.removedBooking);

export default router;
