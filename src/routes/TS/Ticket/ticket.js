// All imports
import express from "express";
import { protect } from "../../../middleware/authMiddleware.js";

// Models Import
// import Ticket from "../../../models/Ticket.js";
// import User from "../../../models/User.js";
import controller from "./../../../controllers/index.js";

// Config
const router = express.Router();

// Getting All Tickets (auth required)
// Pagination, Filtering (by author, date, type, approved/not approved etc)
router.get("/", protect, controller.ticketController.getAllTickets);

// Get specific ticket
router.get("/:id", protect, controller.ticketController.getTicket);

// New ticket (auth required)
router.post("/new", protect, controller.ticketController.createTicket);

// Update ticket (auth required)
router.patch("/:id/update", protect, controller.ticketController.updateTicket);

// Delete a ticket (auth required)
router.get("/:id/delete", protect, controller.ticketController.deleteTicket);

export default router;
