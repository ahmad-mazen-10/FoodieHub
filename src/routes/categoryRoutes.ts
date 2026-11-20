import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";
import {
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.get("/getAll", getAllCategoriesController); 
categoryRouter.post("/create", authMiddleware, adminMiddleware, createCategoryController);
categoryRouter.put("/update/:id", authMiddleware, adminMiddleware, updateCategoryController);
categoryRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteCategoryController);

export default categoryRouter;