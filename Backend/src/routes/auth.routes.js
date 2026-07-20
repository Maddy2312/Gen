import { Router } from "express";
import {
  loginUser,
  registerUser,
  getUser,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidation,
} from "../validators/auth.validator.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidation, registerUser);
authRouter.post("/login", loginValidator, loginUser);
authRouter.get("/getUser", authenticateUser, getUser);

export default authRouter;
