const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    // Visual style for the banner
    type: {
      type: String,
      enum: ["info", "success", "warning"],
      default: "info",
    },
    active: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Announcement", announcementSchema);
