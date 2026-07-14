const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, required: true, trim: true },
    phoneNo: { type: String, trim: true },
    countrycode: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
