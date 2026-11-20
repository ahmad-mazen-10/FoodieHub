import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";

export async function adminMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const user = await User.findById(request.userId).select("userType");
    if (!user || user.userType !== "admin") {
      return response
        .status(403)
        .send({ success: false, message: "Admins only" });
    }
    return next();
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send({ success: false, message: "Server error" });
  }
}
