const { baseLayout } = require("./_layout");

const otpTemplate = (otp) => {
  const body = `
    <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:#a3a3c2;">
      Thanks for signing up with Learnity! Use the one-time password below to complete your registration.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:8px 0 24px;">
          <div style="display:inline-block; padding:18px 40px; background:rgba(124,58,237,0.15); border:1px solid rgba(168,85,247,0.4); border-radius:12px;">
            <span style="font-size:34px; font-weight:700; letter-spacing:10px; color:#c4b5fd;">${otp}</span>
          </div>
        </td>
      </tr>
    </table>
    <p style="margin:0; font-size:14px; line-height:1.6; color:#a3a3c2;">
      This code is valid for <strong style="color:#e2e8f0;">5 minutes</strong>. If you didn't request this, you can safely ignore this email.
    </p>`;

  return baseLayout({
    title: "Verify your Learnity account",
    heading: "Verify your email",
    body,
  });
};

module.exports = otpTemplate;
