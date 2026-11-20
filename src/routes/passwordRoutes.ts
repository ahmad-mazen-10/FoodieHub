import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  forgetPasswordController,
  resetPasswordController,
  updatePasswordController,
} from "../controllers/passwordController";

const passwordRouter = express.Router();

passwordRouter.put("/update", authMiddleware, updatePasswordController as express.RequestHandler);
passwordRouter.put("/reset", resetPasswordController);
passwordRouter.put("/forget", forgetPasswordController);

export default passwordRouter;
