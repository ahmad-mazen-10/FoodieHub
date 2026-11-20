import { Request, Response } from "express";
import mongoose from "mongoose";
import { Food } from "../models/foodModel";
import { Category } from "../models/categoryModel";
import { Restaurant } from "../models/restaurantModel";

const EDITABLE_FIELDS = [
  "title",
  "description",
  "price",
  "imageUrl",
  "foodTags",
  "category",
  "code",
  "isAvailable",
] as const;

function pickEditableFields(body: Record<string, unknown>) {
  const data: Record<string, unknown> = {};
  for (const field of EDITABLE_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  return data;
}

function isValidPrice(price: unknown) {
  return typeof price === "number" && Number.isFinite(price) && price >= 0;
}

// Create
export async function createFoodController(
  request: Request,
  response: Response,
) {
  try {
    const { title, description, price, restaurant, category } = request.body;

    if (!title || !description || price === undefined || !restaurant) {
      return response.status(400).send({
        success: false,
        message: "title, description, price and restaurant are required",
      });
    }

    if (!isValidPrice(price)) {
      return response.status(400).send({
        success: false,
        message: "price must be a non-negative number",
      });
    }

    if (!mongoose.isValidObjectId(restaurant)) {
      return response
        .status(400)
        .send({ success: false, message: "Invalid restaurant id" });
    }

    if (category !== undefined && !mongoose.isValidObjectId(category)) {
      return response
        .status(400)
        .send({ success: false, message: "Invalid category id" });
    }

    if (!(await Restaurant.exists({ _id: restaurant }))) {
      return response
        .status(404)
        .send({ success: false, message: "Restaurant not found" });
    }

    if (category !== undefined && !(await Category.exists({ _id: category }))) {
      return response
        .status(404)
        .send({ success: false, message: "Category not found" });
    }

    const food = await Food.create({
      ...pickEditableFields(request.body),
      restaurant,
    });

    return response.status(201).send({
      success: true,
      message: "Food created successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send({ success: false, message: "Error in create food API" });
  }
}

// Get all
export async function getAllFoodsController(
  request: Request,
  response: Response,
) {
  try {
    const foods = await Food.find({});

    return response.status(200).send({
      success: true,
      message: "Foods fetched successfully",
      totalCount: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send({ success: false, message: "Error in get all foods API" });
  }
}

// Get single
export async function getFoodByIdController(
  request: Request,
  response: Response,
) {
  try {
    const id = request.params.id as string;

    if (!mongoose.isValidObjectId(id)) {
      return response
        .status(400)
        .send({ success: false, message: "Invalid food id" });
    }

    const food = await Food.findById(id);
    if (!food) {
      return response
        .status(404)
        .send({ success: false, message: "Food not found" });
    }

    return response.status(200).send({
      success: true,
      message: "Food fetched successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send({ success: false, message: "Error in get food by id API" });
  }
}

// Get foods of one restaurant
export async function getFoodsByRestaurantController(
  request: Request,
  response: Response,
) {
  try {
    const restaurantId = request.params.id as string;

    if (!mongoose.isValidObjectId(restaurantId)) {
      return response
        .status(400)
        .send({ success: false, message: "Invalid restaurant id" });
    }

    const foods = await Food.find({ restaurant: restaurantId });

    return response.status(200).send({
      success: true,
      message: "Foods fetched successfully",
      totalCount: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send({
      success: false,
      message: "Error in get foods by restaurant API",
    });
  }
}

// Update
export async function updateFoodController(
  request: Request,
  response: Response,
) {
  try {
    const id = request.params.id as string;

    if (!mongoose.isValidObjectId(id)) {
      return response
        .status(400)
        .send({ success: false, message: "Invalid food id" });
    }

    const data = pickEditableFields(request.body);

    if (data.price !== undefined && !isValidPrice(data.price)) {
      return response.status(400).send({
        success: false,
        message: "price must be a non-negative number",
      });
    }

    if (data.category !== undefined) {
      if (!mongoose.isValidObjectId(data.category)) {
        return response
          .status(400)
          .send({ success: false, message: "Invalid category id" });
      }
      if (!(await Category.exists({ _id: data.category }))) {
        return response
          .status(404)
          .send({ success: false, message: "Category not found" });
      }
    }

    const food = await Food.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!food) {
      return response
        .status(404)
        .send({ success: false, message: "Food not found" });
    }

    return response.status(200).send({
      success: true,
      message: "Food updated successfully",
      food,
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send({ success: false, message: "Error in update food API" });
  }
}

// Delete
export async function deleteFoodController(
  request: Request,
  response: Response,
) {
  try {
    const id = request.params.id as string;

    if (!mongoose.isValidObjectId(id)) {
      return response
        .status(400)
        .send({ success: false, message: "Invalid food id" });
    }

    const deleted = await Food.findByIdAndDelete(id);
    if (!deleted) {
      return response
        .status(404)
        .send({ success: false, message: "Food not found" });
    }

    return response
      .status(200)
      .send({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send({ success: false, message: "Error in delete food API" });
  }
}
