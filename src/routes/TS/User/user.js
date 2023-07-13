// All imports
import express from "express";

// Controllers import
import controller from "./../../../controllers/index.js";

// Config
const router = express.Router();

// Get all users (auth required)
router.get("/", controller.userController.getAllUsers);

// Get specific user (auth required)
router.get("/:id", controller.userController.getUserById);

// Create new user
router.post("/new", controller.userController.createUser);

// Update existing user (auth required)
router.patch("/:id/update", controller.userController.updateUser);

// Delete user (auth required)
router.get("/:id/delete", controller.userController.deleteUser);

export default router;