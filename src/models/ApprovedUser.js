import mongoose from "mongoose";

const approvedUserSchema = new mongoose.Schema({
  registrationNumber: [
    {
      type: Number,
      unique: true,
      max: 999999999,
    },
  ],

  // Will generate/collect automatically
  userDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ApprovedUser = mongoose.model("ApprovedUser", approvedUserSchema);

export default ApprovedUser;
