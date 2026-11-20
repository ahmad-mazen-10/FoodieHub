import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    userType: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://imgs.search.brave.com/NRFIfTC18AW5yMzUH0iWaFrz4cPBIHAMbVZB8mg-224/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzQ5LzEyLzYz/LzM2MF9GXzEyNDkx/MjYzMzhfbGVTNXlU/RDJOZEd1VHJhODZt/R3lxOWhlRUF4TGJY/NU8uanBn",
    },
    otp: {
      type: String,
    },
    otpExpires : { type: Date },
    otpAttempts: {
      type: Number,
      defualt: 0,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);

// timestamp : genrates createdAt and updatedAt fields automatically
