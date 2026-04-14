import { Router } from "express";
import validate from "../../common/middleware/validate.js";
import { registerUserSchema } from "./authValidateSchema.js";
import * as authController from "./authController.js";

const router = Router();
router.post("/register", validate(registerUserSchema), authController.register);

export default router;
