const { contactUsEmail } = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/mailSender");
const ContactMessage = require("../models/ContactMessage");

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } =
    req.body;
  try {
    // Persist the message so the admin can read it later (email/SMTP may be blocked)
    await ContactMessage.create({
      firstName: firstname,
      lastName: lastname,
      email,
      phoneNo,
      countrycode,
      message,
    });

    // Attempt to send a confirmation email, but don't block the response on it
    mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode),
    ).catch((err) => console.log("Contact email failed:", err?.message));

    return res.json({
      success: true,
      message: "Message received successfully",
    });
  } catch (error) {
    console.error("CONTACT_US ERROR:", error.message);
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
};
