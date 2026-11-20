import express from "express";
import {
  getUserController,
  getAllUsersController,
  updateUserController,
  deleteAccountController,
  deleteUserController,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.get("/getUser", authMiddleware, getUserController);
userRouter.get("/getAllUsers", authMiddleware, getAllUsersController);
userRouter.put("/updateUser", authMiddleware, updateUserController);
userRouter.delete("/deleteUser/:id", authMiddleware, deleteUserController);
userRouter.delete("/deleteAccount", authMiddleware, deleteAccountController);

export default userRouter;
