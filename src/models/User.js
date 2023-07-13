import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 30,
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 30,
    },
    registrationNumber: {
        type: Number,
        required: true,
        unique: true,
        max: 999999999,
    },
    manipalEmailID: {
        type: String,
        required: true,
        unique: true,
        match: [/^[^\s@]+@muj\.manipal\.edu$/, 'Please enter a valid manipal student email id'],
        maxlength: 50,
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'],
    },
    isHosteller: {
        type: Boolean,
        required: true,
        default: true,
    },
    // Instagram, Facebook, LinkedIn profile links (not required)
    // instagramURL: {
    //     type: String,
    //     required: false,
    // }

    // Will collect/generate automatically
    tickets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
        }
    ],
    approvedByAdmin: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        immutable: true,
    },
    accountCreatedOn: {
        type: Date,
        default: Date.now,
    }
});

// Virtual Properties
userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
})

userSchema.virtual("numberOfTickets").get(function () {
    return this.tickets.length;
})

const User = mongoose.model("User", userSchema);

export default User;