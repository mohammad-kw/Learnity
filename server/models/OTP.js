const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  // Create a transporter to send emails

  // Define the email options

  // Send the email
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      emailTemplate(otp),
    );
    console.log("Email sent successfully: ", mailResponse.response);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
  console.log("New document saved to database");

  // Only send an email when a new document is created
  if (this.isNew) {
    // Dev/demo only: log the OTP so signup works even without mail
    // credentials. Gated behind EXPOSE_OTP so it never leaks in production.
    if (process.env.EXPOSE_OTP === "true") {
      console.log("\n==============================");
      console.log(`🔑 OTP for ${this.email}: ${this.otp}`);
      console.log("==============================\n");
    }

    // Fire-and-forget: send the email in the background so signup responds
    // instantly instead of waiting on the (slow) SMTP server.
    sendVerificationEmail(this.email, this.otp).catch(() => {
      console.log(
        "⚠️  Email delivery skipped/failed — use the OTP logged above.",
      );
    });
  }
  next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
