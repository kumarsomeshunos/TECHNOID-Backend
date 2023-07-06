import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 40,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        enum: ["Open Source", "General", "Faculty"], // Will change
        default: "General",
    },

    // Will generate/collect automatically
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    postedOn: {
        type: Date,
        default: Date.now,
    },
    expiresOn: {
        type: Date,
        default: () => new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)),
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    approvedByAdmin: {
        type: Boolean,
        default: false,
    }
});

const Ticket = mongoose.Model("Ticket", ticketSchema);

export default Ticket;