import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const registerController = async (
  request: Request,
  response: Response,
) => {
  try {
    const { userName, email, password, phone, address } = request.body;

    //validation
    if (!userName || !email || !password || !phone || !address) {
      return response.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }

    // check user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(500).send({
        success: false,
        message: "User already exists",
      });
    }

    const HashedPassword = await bcrypt.hash(password, 10);

    //create new user

    // const newUser= new User({userName, email, password, phone, address})
    // await newUser.save()
    //  2⬆️ = 1⬇️
    const newUser = await User.create({
      userName,
      email,
      password: HashedPassword,
      phone,
      address,
    });

    response.status(201).send({
      success: true,
      message: "User registered successfully",
      newUser: {
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        userType: newUser.userType,
      },
    });
  } catch (error) {
    console.log(error, "!!!!!!!!!");
    response.status(500).send({
      success: false,
      message: "Error in Register API",
    });
  }
};

export const loginController = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email }); // ... User.findOne({ email:email, password:password });

    if (!email || !password) {
      return response.status(500).send({
        success: false,
        message: "Email and password are required",
      });
    }

    //check user
    if (!user) {
      return response.status(404).send({
        success: false,
        message: "User not found or invalid email or password",
      });
    }

    // 3. Compare entered password with stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return response.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = JWT.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "7d" },
    );

    // ⬇️ Create an object from the user, exclude the password, and return the rest of the object.
    const { password: _password, ...safeUser } = user.toObject();
    return response.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "Error in Login API",
    });
  }
};

export const logoutController = async (
  request: Request,
  response: Response,
) => {
  try {
    const targetId = request.params.id;
    response.clearCookie("token");

    return response.status(200).send({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log("Error in logout API", error);
    response.status(500).send({
      success: false,
      message: "Error in Logout API",
    });
  }
};
