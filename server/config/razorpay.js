const Razorpay = require("razorpay");

// Only create a real Razorpay instance when valid credentials are provided.
// Otherwise export null so the server can start without payment configured
// (e.g. on hosting where RAZORPAY_KEY is unset or a placeholder).
const key_id = process.env.RAZORPAY_KEY;
const key_secret = process.env.RAZORPAY_SECRET;

const hasValidKeys =
  key_id &&
  key_secret &&
  !key_id.startsWith("your_") &&
  !key_secret.startsWith("your_");

if (!hasValidKeys) {
  console.warn(
    "⚠️  Razorpay not configured (RAZORPAY_KEY/RAZORPAY_SECRET missing). Payment features are disabled.",
  );
}

exports.instance = hasValidKeys ? new Razorpay({ key_id, key_secret }) : null;
