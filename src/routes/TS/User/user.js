// All imports
import express from "express";

// Models Import
// import User from "../../../models/User.js";

// Config
const router = express.Router();

// Get all users (auth required)
// Pagination, Filtering
router.get("/", (req, res) => {

})

// Get specific user (auth required)
router.get("/:id", (req, res) => {

})

// Create new user
router.post("/new", (req, res) => {

})

// Update existing user (auth required)
router.patch("/:id/update", (req, res) => {

})

// Delete user (auth required)
router.get("/:id/delete", (req, res) => {

})

export default router;