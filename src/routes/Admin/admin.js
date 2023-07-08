// All imports
import express from "express";

// Routes
import MediaIORouter from "./mediaIO.js";

// Models Import
// import User from "../../models/User.js";

// Config
const router = express.Router();

// Middlewares
// Routes
router.use("/media", MediaIORouter);

export default router;