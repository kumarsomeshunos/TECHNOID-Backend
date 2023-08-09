import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

export async function getAllTickets(req, res) {
  try {
    let { page, limit, author, category, approvedByAdmin, open } = req.query;
    page = parseInt(page) - 1 || 0;
    limit = parseInt(limit) || 5;

    let query = {};
    if (open == "true") query.expiresOn = { $gte: Date.now() };
    else if (open == "false") query.expiresOn = { $lte: Date.now() };
    if (author) query.author = author;
    if (category) query.category = category;
    if (approvedByAdmin == "true") query.approvedByAdmin = true;
    else if (approvedByAdmin == "false") query.approvedByAdmin = false;

    let tickets = await Ticket.find(query)
      .skip(page * limit)
      .limit(limit);
    if (tickets.length === 0) {
      return res.json({
        success: false,
        message: "No tickets Found!",
        error: "No tickets found change filter query or check database",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Tickets Data", data: tickets });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

// Get specific ticket
export async function getTicket(req, res) {
  try {
    let id = req.params.id;
    let ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.json({
        success: false,
        message: "Ticket Not Found",
        error: `Ticket with ID:${id} is not found !`,
      });
    }
    await ticket.populate("author", "firstName lastName approvedByAdmin");
    await ticket.populate(
      "interestedToWork",
      "firstName lastName manipalEmailID mobileNumber approvedByAdmin"
    );
    return res
      .status(200)
      .json({ success: true, message: "Ticket Data", data: ticket });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

// New ticket (auth required)
export async function createTicket(req, res) {
  try {
    let ticket = req.body;
    ticket.author = req.user._id;
    let newTicket = await Ticket.create(ticket);
    await newTicket.save();
    let user = await User.findById(req.user._id);
    user.tickets.push(newTicket._id);
    await user.save();
    return res.status(201).json({
      success: true,
      message: "New Ticket created successfully",
      data: newTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

// Update ticket (auth required)
export async function updateTicket(req, res) {
  try {
    let id = req.params.id;
    let ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }
    if (!ticket.author.equals(req.user._id) && !req.user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to update this ticket!",
      });
    }
    ticket = await Ticket.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(201).json({
      success: true,
      message: "Ticket updated successfully",
      data: ticket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

// Delete a ticket (auth required)
export async function deleteTicket(req, res) {
  try {
    let id = req.params.id;
    let ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }
    if (!ticket.author.equals(req.user._id) && !req.user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to delete this ticket!",
      });
    }
    await Ticket.findByIdAndDelete(id);
    await User.updateOne({ _id: ticket.author }, { $pull: { tickets: id } });
    return res.status(201).json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

// Showed interest to work
export async function addToInterest(req, res) {
  try {
    let id = req.params.id;
    let ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }
    if (ticket.author.equals(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "Could not show interest in own project!",
      });
    }
    ticket.interestedToWork.push(req.user._id);
    await ticket.save();
    let user = await User.findById(req.user._id);
    user.projectsInterested.push(id);
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Added Successfully!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
}
