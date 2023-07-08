// All imports
import express from "express";

// Models Import
// import Ticket from "../../../models/Ticket.js";
// import User from "../../../models/User.js";

// Config
const router = express.Router();

// Getting All Tickets (auth required)
// Pagination, Filtering (by author, date, type, approved/not approved etc)
router.get("/", (req, res) => {

})

// Get specific ticket
router.get("/:id", (req, res) => {

})

// New ticket (auth required)
router.post("/new", (req, res) => {

})

// Update ticket (auth required)
router.patch("/:id/update", (req, res) => {

})

// Delete a ticket (auth required)
router.get("/:id/delete", (req, res) => {

})

export default router;