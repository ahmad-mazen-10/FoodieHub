import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createRestaurantController, deleteRestaurantController, getAllRestaurantController, getRestaurantByIdController } from '../controllers/restaurantController';
import { adminMiddleware } from '../middleware/adminMiddleware';

const restaurantRouter = express.Router();

restaurantRouter.get("/getAll", getAllRestaurantController);                      
restaurantRouter.get("/getOne/:id", getRestaurantByIdController);                   
restaurantRouter.post("/create", authMiddleware, adminMiddleware, createRestaurantController);
restaurantRouter.delete("/deleteOne/:id", authMiddleware, adminMiddleware, deleteRestaurantController);

export default restaurantRouter;
