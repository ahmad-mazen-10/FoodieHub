import { body } from "express-validator";
import JWT, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (
  request: any,
  response: any,
  next: any,
) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    const secret = process.env.JWT_SECRET_KEY;

    if (!token) {
      return response.status(401).send({
        success: false,
        message: "Provide auth token",
      });
    }

    if (!secret) {
      return response.status(500).send({
        success: false,
        message: "JWT secret is not configured",
      });
    }

    const decoded = JWT.verify(token, secret) as JwtPayload;
    request.userId = decoded.id as string;

    return next();
  } catch (error: any) {
    console.log("JWT error:", error.message);
    return response
      .status(401)
      .send({ success: false, message: "Unauthorized Auth token" });
  }
};
