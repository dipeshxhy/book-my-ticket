import { Router } from "express";
import validate from "../../common/middleware/validate.js";
import { loginUserSchema, registerUserSchema } from "./authValidateSchema.js";
import * as authController from "./authController.js";

const router = Router();
router.post("/register", validate(registerUserSchema), authController.register);
router.post("/login", validate(loginUserSchema), authController.login);

export default router;
