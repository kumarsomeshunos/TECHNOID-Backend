// All imports
import express from "express";

// Controllers import
import controller from "./../../../controllers/index.js";

// JWT check
import { protect } from "../../../middleware/authMiddleware.js";

// Config
const router = express.Router();

// Get all users (auth required)
router.get("/", controller.userController.getAllUsers);

// Get specific user (auth required)
router.get("/:id", controller.userController.getUserById);

// Create new user
router.post("/new", controller.userController.createUser);

// Update existing user (auth required)
router.patch("/:id/update", protect, controller.userController.updateUser);


// Delete user (auth required)
router.get("/:id/delete", protect, controller.userController.deleteUser);


// Logout the user
router.get("/:id/logout", controller.userController.logoutUser);

export default router;