import express from "express";
import {
  registerController,
  loginController,
  logoutController,
} from "../controllers/authController";
import {
  loginValidation,
  registerValidation,
} from "../validations/authvalidation";
import { authMiddleware } from "../middleware/authMiddleware";

const authRouter = express.Router();

authRouter.post("/register", registerValidation, registerController);
authRouter.post("/login", loginValidation, loginController);
authRouter.post("/logout",authMiddleware, logoutController);

export default authRouter;
