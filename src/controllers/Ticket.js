import Ticket from "../models/Ticket.js";
// import User from "../models/User";

export async function getAllTickets(req, res) {
  try {
    let { page, limit, author, category, approvedByAdmin } = req.query;
    page = parseInt(page) - 1 || 0;
    limit = parseInt(limit) || 5;

    let query = {};
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
    await ticket.populate("author");
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
    let author = "64af98880d69e7f40be725ee"; //get from auth data currently hard-coded
    let ticket = req.body;
    ticket.author = author;
    let newTicket = await Ticket.create(ticket);
    await newTicket.save();
    await newTicket.populate("author");
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
