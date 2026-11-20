import mongoose from "mongoose";
import { Request, Response } from "express";
import { Restaurant } from "../models/restaurantModel";

export async function createRestaurantController(
  request: Request,
  response: Response,
) {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      code,
      coords,
    } = request.body;

    if (!title || !coords) {
      return response.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }
    const restaurant = await Restaurant.create({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      code,
      coords,
    });

    response.status(201).send({
      success: true,
      message: "New Restaurant  Created successfully",
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: "Error In Create Restaurant  api",
    });
  }
}

export async function getAllRestaurantController(
  request: Request,
  response: Response,
) {
  try {
    const restaurants = await Restaurant.find({});
    if (restaurants.length === 0) {
      return response.status(404).send({
        success: false,
        message: "No Resturant Availible",
      });
    }
    response.status(200).send({
      success: true,
      message: "Fetched Resturants successfully",
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: "Error In Get ALL Resturat API",
    });
  }
}

export async function getRestaurantByIdController(
  request: Request,
  response: Response,
) {
  try {
    const restaurantId = request.params.id;
    if (!mongoose.isValidObjectId(restaurantId)) {
      return response
        .status(400)
        .send({ success: false, message: "Invalid restaurant id" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return response.status(404).send({
        success: false,
        message:  "Restaurant not found",
      });
    }

    response.status(200).send({
      success: true,
      message: "Get Specific Restaurat",
      restaurant,
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: "Error In Get Restaurat By Id",
    });
  }
}

export async function deleteRestaurantController(
  request: Request,
  response: Response,
) {
  try {
    const restaurantId = request.params.id;
    if (!mongoose.isValidObjectId(restaurantId)) {
      return response.status(400).send({ success: false, message: "Invalid restaurant id" });
    }
    
    const deleted = await Restaurant.findByIdAndDelete(restaurantId);
    if (!deleted) {
      return response
        .status(404)
        .send({ success: false, message: "Restaurant not found" });
    }
    response.status(200).send({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: "Error In Delete Restaurat",
    });
  }
}
