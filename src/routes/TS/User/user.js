// All imports
import express from "express";

// Controllers import
import controller from "./../../../controllers/index.js";

// JWT check
import { protectUser } from "../../../middleware/authMiddleware.js";

// Config
const router = express.Router();

// Get all users (auth required)
router.get("/", protectUser, controller.userController.getAllUsers);

// Get specific user (auth required)
router.get("/:id", protectUser, controller.userController.getUserById);

// Create new user
router.post("/new", controller.userController.createUser);

// Update existing user (auth required)
router.patch("/:id/update", protectUser, controller.userController.updateUser);

// Delete user (auth required)
router.get("/:id/delete", protectUser, controller.userController.deleteUser);

// Logout the user
router.get("/:id/logout", protectUser, controller.userController.logoutUser);

export default router;
