// All imports
import express from "express";

// Models Import
import Ticket from "./../../models/Ticket";
import User from "../../models/User";

// Config
const router = express.Router();

// Getting All Tickets
router.get("/", (req, res) => {

})

// New ticket
router.post("/new", (req, res) => {

})

// Get ticket by author, but id of user
// router.get("/:id/tickets", (req, res) => {

// })

// Get ticket by author
// router.get("/category.enum", (req, res) => {

// })

// update approval
router.patch("/:id/update", (req, res) => {

})

// delete a ticket (auth required)
router.get("/:id/delete", (req, res) => {

})

// can add two approved not approved search too

export default router;