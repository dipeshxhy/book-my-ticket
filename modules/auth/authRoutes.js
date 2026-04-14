import { Router } from "express";
import validate from "../../common/middleware/validate.js";
import { loginUserSchema, registerUserSchema } from "./authValidateSchema.js";
import * as authController from "./authController.js";
import { authenticated } from "../../common/middleware/authenticate.js";

const router = Router();
router.post("/register", validate(registerUserSchema), authController.register);
router.post("/login", validate(loginUserSchema), authController.login);
router.get("/me", authenticated, authController.getMe);

export default router;
