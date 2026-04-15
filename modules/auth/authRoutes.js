import { Router } from "express";
import * as authController from "./authController.js";
import {
  authenticated,
  authorized,
} from "../../common/middleware/authenticate.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authenticated, authController.logout);
router.get("/me", authenticated, authController.getMe);

export default router;
