import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";
import {
  createFoodController,
  getAllFoodsController,
  getFoodByIdController,
  getFoodsByRestaurantController,
  updateFoodController,
  deleteFoodController,
} from "../controllers/foodController";

const foodRouter = express.Router();

foodRouter.get("/getAll", getAllFoodsController); 
foodRouter.get("/get/:id", getFoodByIdController);
foodRouter.get("/getByRestaurant/:id", getFoodsByRestaurantController);
foodRouter.post("/create", authMiddleware, adminMiddleware, createFoodController);
foodRouter.put("/update/:id", authMiddleware, adminMiddleware, updateFoodController);
foodRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteFoodController);

export default foodRouter;