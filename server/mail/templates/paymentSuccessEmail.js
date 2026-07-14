const { baseLayout } = require("./_layout");

exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  const row = (label, value) => `
    <tr>
      <td style="padding:10px 16px; font-size:14px; color:#a3a3c2; border-bottom:1px solid rgba(255,255,255,0.06);">${label}</td>
      <td style="padding:10px 16px; font-size:14px; color:#e2e8f0; font-weight:600; text-align:right; border-bottom:1px solid rgba(255,255,255,0.06);">${value}</td>
    </tr>`;

  const body = `
    <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#a3a3c2;">
      Hi <strong style="color:#e2e8f0;">${name}</strong>,
    </p>
    <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:#a3a3c2;">
      Thank you for your purchase! We've successfully received your payment. Here are your transaction details:
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(124,58,237,0.08); border:1px solid rgba(168,85,247,0.25); border-radius:12px; overflow:hidden;">
      ${row("Amount Paid", `₹${amount}`)}
      ${row("Payment ID", paymentId)}
      ${row("Order ID", orderId)}
    </table>
    <p style="margin:24px 0 0; font-size:14px; line-height:1.6; color:#a3a3c2;">
      Keep this email as your receipt. Happy learning!
    </p>`;

  return baseLayout({
    title: "Payment Confirmation",
    heading: "Payment successful ✅",
    body,
  });
};
