import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/userModel";

export async function getUserController(request: Request, response: Response) {
  try {
    const user = await User.findById(request.userId).select("-password");

    if (!user) {
      return response.status(404).send({
        success: false,
        message: "Not found User, plz sign up ",
      });
    }

    //  - exclude password from the user object
    // const { password, ...userData } = user.toObject();

    response.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: "Error in get user",
    });
  }
}
export async function getAllUsersController(
  request: Request,
  response: Response,
) {
  try {
    const users = await User.find().select("-password");

    if (users.length === 0) {
      return response.status(404).send({
        success: false,
        message: "Not found Users",
      });
    }

    //  - exclude password from the user object
    // const { password, ...userData } = user.toObject();

    response.status(200).send({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);

    response.status(500).send({
      success: false,
      message: "Error in get users API",
    });
  }
}

export async function updateUserController(
  request: Request,
  response: Response,
) {
  try {
    const { userName, email, phone, address } = request.body;
    const user = await User.findByIdAndUpdate(
      request.userId,
      { userName, email, phone, address },
      { returnDocument: "after", runValidators: true },
    ).select("-password");

    //validation
    if (!user) {
      return response.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return response.status(200).send({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return response
        .status(409)
        .send({ success: false, message: "Email already in use" });
    }
    return response
      .status(500)
      .send({ success: false, message: "Server error" });
  }
}

export async function deleteAccountController(
  request: Request,
  response: Response,
) {
  try {
    const { password } = request.body;
    if (!password) {
      return response
        .status(400)
        .send({ success: false, message: "Password is required" });
    }

    const user = await User.findById(request.userId);
    if (!user) {
      return response
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response
        .status(401)
        .send({ success: false, message: "Password is incorrect" });
    }

    await User.findByIdAndDelete(request.userId);

    response.status(200).send({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: "Error in delete profile API ",
    });
  }
}

// -----------------  By Admin    --------------------
export async function deleteUserController(
  request: Request,
  response: Response,
) {
  try {
    const admin = await User.findById(request.userId).select("userType");
    if (!admin || admin.userType !== "admin") {
      return response
        .status(403)
        .send({ success: false, message: "You aren't Admin, Admin Only" });
    }
    if (request.params.id === request.userId) {
      return response.status(400).send({
        success: false,
        message: "Use deleteAccount to delete your own account",
      });
    }

    const deleted = await User.findByIdAndDelete(request.params.id);
    if (!deleted) {
      return response
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    response.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: "Error in delete user API ",
    });
  }
}
