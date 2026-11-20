import { Request, Response } from "express";
import mongoose from "mongoose";
import { Category } from "../models/categoryModel";
import { Food } from "../models/foodModel";

// Create
export async function createCategoryController(
  request: Request,
  response: Response,
) {
  try {
    const { title, imageUrl } = request.body;

    if (!title) {
      return response
        .status(400)
        .send({ success: false, message: "category title is required" });
    }

    const category = await Category.create({ title, imageUrl });

    return response.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error: any) {
    console.log(error);
    if (error.code === 11000) {
      return response
        .status(409)
        .send({ success: false, message: "Category already exists" });
    }
    return response
      .status(500)
      .send({ success: false, message: "Error in create category API" });
  }
}

// Get all
export async function getAllCategoriesController(
  request: Request,
  response: Response,
) {
  try {
    const categories = await Category.find({});

    return response.status(200).send({
      success: true,
      message: "Categories fetched successfully",
      totalCount: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send({ success: false, message: "Error in get categories API" });
  }
}

// Update
export async function updateCategoryController(
  request: Request,
  response: Response,
) {
  try {
    const id = request.params.id as string;
    const { title, imageUrl } = request.body;

    if (!mongoose.isValidObjectId(id)) {
      return response
        .status(400)
        .send({ success: false, message: "Invalid category id" });
    }

    // حدّث اللي اتبعت بس
    const update: Record<string, unknown> = {};
    if (title !== undefined) update.title = title;
    if (imageUrl !== undefined) update.imageUrl = imageUrl;

    const category = await Category.findByIdAndUpdate(id, update, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!category) {
      return response
        .status(404)
        .send({ success: false, message: "Category not found" });
    }

    return response.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error: any) {
    console.log(error);
    if (error.code === 11000) {
      return response
        .status(409)
        .send({ success: false, message: "Category title already in use" });
    }
    return response
      .status(500)
      .send({ success: false, message: "Error in update category API" });
  }
}

// Delete
export async function deleteCategoryController(
  request: Request,
  response: Response,
) {
  try {
    const id = request.params.id as string;

    if (!mongoose.isValidObjectId(id)) {
      return response
        .status(400)
        .send({ success: false, message: "Invalid category id" });
    }

    if (await Food.exists({ category: id })) {
      return response.status(409).send({
        success: false,
        message: "Cannot delete a category that still has foods",
      });
    }

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return response
        .status(404)
        .send({ success: false, message: "Category not found" });
    }

    return response
      .status(200)
      .send({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send({ success: false, message: "Error in delete category API" });
  }
}
