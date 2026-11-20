# FoodieHub – Food Delivery Backend API

A RESTful Backend API for a Food Delivery Application, built with Node.js, Express.js, TypeScript, and MongoDB.

The project focuses on backend development concepts, including authentication, authorization, user management, restaurant management, category management, and email verification.

## Tech Stack

- **Node.js** – JavaScript Runtime Environment
- **Express.js** – Backend Web Framework
- **TypeScript** – Static Typing
- **MongoDB** – NoSQL Database
- **Mongoose** – MongoDB Object Modeling
- **JWT** – Authentication
- **bcrypt** – Password Hashing
- **Nodemailer** – Email Services
- **Express Validator** – Request Validation
- **dotenv** – Environment Variables
- **CORS** – Cross-Origin Resource Sharing

## Features

### Authentication & Authorization
- User Registration and Login.
- JWT-based Authentication.
- Role-Based Authorization.
- Password Hashing using bcrypt.
- Email OTP Verification.
- Forgot Password functionality.
- Reset Password functionality.
- Logout functionality.

### User Management
- User Management Operations.
- User Profile Management.
- Account Deletion.

### Restaurant Management
- Create Restaurant.
- Get Restaurants.
- Update Restaurant.
- Delete Restaurant.
- Restaurant Information and Location Management.
- Restaurant Rating Information.

### Category Management
- Create Categories.
- Retrieve Categories.
- Update Categories.
- Delete Categories.

### Validation & Error Handling
- Request Validation using Express Validator.
- Try/Catch Error Handling in Controllers.
- Authentication and Authorization Middleware.

## Project Structure

```text
src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── validations/
├── utils/
└── types/
```

The project follows a modular, MVC-style organization to separate application responsibilities and keep the codebase organized.

## Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd FoodieHub
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and configure the required environment variables.

```env
PORT=YOUR_PORT
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET
EMAIL_USER=YOUR_EMAIL
EMAIL_PASSWORD=YOUR_EMAIL_PASSWORD
```

Make sure the environment variable names match those used in your application.

### 5. Run the Application

Use the development or production scripts defined in your `package.json`.

```bash
npm run YOUR_DEV_SCRIPT
```

## API Modules

The API is organized into the following modules:

| Module | Responsibility |
|---|---|
| Authentication | Registration, Login, OTP Verification |
| Password | Forgot Password, Reset Password |
| Users | User Management |
| Restaurants | Restaurant Management |
| Categories | Category Management |

## Learning Objectives

This project provides practical experience with:

- Building RESTful APIs using Express.js.
- Structuring a TypeScript Backend Application.
- Working with MongoDB and Mongoose.
- Implementing JWT Authentication and Authorization.
- Managing User Roles and Permissions.
- Handling Password Hashing and Email OTP Verification.
- Validating API Requests.
- Handling Errors in Controllers.
- Organizing Backend Modules and Responsibilities.

## Project Status

Developed as a practical Backend Development project.

---

**Technologies:** Node.js · Express.js · TypeScript · MongoDB · Mongoose
