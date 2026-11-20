import { body } from "express-validator";

export const registerValidation = [
  body("userName")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 4, max: 20 })
    .withMessage("username must be between 4 and 20 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),

  body("phone")
    .notEmpty()
    .withMessage("phone number is required")
    .isMobilePhone("any")
    .withMessage("phone number must be a valid phone number"),

  body("address").notEmpty().withMessage("address is required"),
];


export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
];
