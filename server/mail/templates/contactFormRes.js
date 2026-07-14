const { baseLayout } = require("./_layout");

exports.contactUsEmail = (
  email,
  firstname,
  lastname,
  message,
  phoneNo,
  countrycode,
) => {
  const row = (label, value) => `
    <tr>
      <td style="padding:10px 16px; font-size:14px; color:#a3a3c2; border-bottom:1px solid rgba(255,255,255,0.06); white-space:nowrap; vertical-align:top;">${label}</td>
      <td style="padding:10px 16px; font-size:14px; color:#e2e8f0; text-align:right; border-bottom:1px solid rgba(255,255,255,0.06);">${value}</td>
    </tr>`;

  const body = `
    <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#a3a3c2;">
      Hi <strong style="color:#e2e8f0;">${firstname} ${lastname}</strong>,
    </p>
    <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:#a3a3c2;">
      Thanks for reaching out to Learnity! We've received your message and our team will get back to you shortly. Here's a copy of what you sent us:
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(124,58,237,0.08); border:1px solid rgba(168,85,247,0.25); border-radius:12px; overflow:hidden;">
      ${row("Name", `${firstname} ${lastname}`)}
      ${row("Email", email)}
      ${row("Phone", `${countrycode ? countrycode + " " : ""}${phoneNo}`)}
      ${row("Message", message)}
    </table>`;

  return baseLayout({
    title: "We received your message",
    heading: "Thanks for contacting us 💬",
    body,
  });
};
