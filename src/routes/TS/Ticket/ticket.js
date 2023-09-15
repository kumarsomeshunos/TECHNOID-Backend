// All imports
import express from "express";
import { protectUser } from "../../../middleware/authMiddleware.js";

// Models Import
// import Ticket from "../../../models/Ticket.js";
// import User from "../../../models/User.js";
import controller from "./../../../controllers/index.js";

// Config
const router = express.Router();

// Getting All Tickets (auth required)
// Pagination, Filtering (by author, date, type, approved/not approved etc)
router.get("/", protectUser, controller.ticketController.getAllTickets);

// Get specific ticket
router.get("/:id", protectUser, controller.ticketController.getTicket);

// New ticket (auth required)
router.post("/new", protectUser, controller.ticketController.createTicket);

// Update ticket (auth required)
router.patch("/:id/update", protectUser, controller.ticketController.updateTicket);

// Delete a ticket (auth required)
router.get("/:id/delete", protectUser, controller.ticketController.deleteTicket);

//Add interest to a ticket
router.get(
  "/:id/interested",
  protectUser,
  controller.ticketController.addToInterest
);

export default router;
