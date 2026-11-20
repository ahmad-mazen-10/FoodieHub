import bcrypt from "bcrypt";
import crypto from "crypto";
import type { Request, Response } from "express";
import { sendEmail } from "../utils/sendEmail";
import { hashPassword, validateNewPassword } from "../utils/newPassword";
import { User } from "../models/userModel";


export async function updatePasswordController(
  request: Request,
  response: Response,
) {
  try {
    const { oldPassword, newPassword } = request.body;

    //validation
    if (!oldPassword) {
      return response.status(400).send({
        success: false,
        message: "Old and new password are required",
      });
    }

    const newPasswordError = validateNewPassword(newPassword);
    if (newPasswordError) {
      return response.status(400).send({
        success: false,
        message: newPasswordError, // the fn return error if not done
      });
    }

    // old validation  !!!!!!!!
    // if (newPassword.length < 6) {
    //   return response.status(400).send({
    //     success: false,
    //     message: "Password must be at least 6 characters",
    //   });
    // }

    const user = await User.findById(request.userId);
    if (!user) {
      return response.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return response.status(401).send({
        success: false,
        message: "Old password is incorret",
      });
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    return response.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return response.status(500).send({
      success: false,
      message: "error in password update API",
    });
  }
}

export async function resetPasswordController(
  request: Request,
  response: Response,
) {
  try {
    const { email, otp, newPassword } = request.body;

    if (!email || !otp) {
      return response.status(400).send({
        success: false,
        message: "email and otp are required",
      });
    }

    const newPasswordError = validateNewPassword(newPassword);
    if (newPasswordError) {
      return response.status(400).send({
        success: false,
        message: newPasswordError, // the fn return error if not done
      });
    }

    const user = await User.findOne({ email });
    if (
      !user ||
      !user.otp ||
      !user.otpExpires ||
      user.otpExpires < new Date()
    ) {
      return response.status(400).send({
        success: false,
        message: "Invalid or expired code",
      });
    }

    if ((user.otpAttempts ?? 0) >= 5) {
      return response.status(429).send({
        success: false,
        message: "Too many attempts, request a new code",
      });
    }

    const hashedOtp = crypto
      .createHash("sha256")
      .update(String(otp))
      .digest("hex");
    if (hashedOtp != user.otp) {
      user.otpAttempts = (user.otpAttempts ?? 0) + 1;
      await user.save();
      return response.status(400).send({
        success: false,
        message: "Invalid or expired code",
      });
    }

    user.password = await hashPassword(newPassword);
    user.otp = null;
    user.otpExpires = null;
    user.otpAttempts = 0;
    await user.save();

    return response.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return response.status(500).send({
      success: false,
      message: "error in password reset API",
    });
  }
}

export async function forgetPasswordController(
  request: Request,
  response: Response,
) {
  try {
    const { email } = request.body;
    if (!email) {
      response.status(400).send({
        success: false,
        message: "enter valid email",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      const otp = crypto.randomInt(100000, 999999).toString();

      user.otp = crypto.createHash("sha256").update(otp).digest("hex");
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      user.otpAttempts = 0;

      await sendEmail(
        email,
        `Password Reset Code:`,
        ` your code is ${otp}. it Expired in 10 mintes `,
      );
    }

    return response.status(200).send({
      success: true,
      message: "If the email exists, a code has been sent",
    });
  } catch (error) {
    return response.status(500).send({
      success: false,
      message: "Error in forget password API",
    });
  }
}
