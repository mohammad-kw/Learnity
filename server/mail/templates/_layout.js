// Shared, email-client-safe Learnity brand layout used by all templates.
// Keeps every email visually consistent with the website (dark theme +
// purple gradient). All styles are inlined because many mail clients strip
// <style> blocks.

/**
 * Wrap inner HTML in the branded Learnity shell.
 * @param {Object} opts
 * @param {string} opts.title      - Email <title> (shown in some clients/tabs)
 * @param {string} opts.heading    - Big heading at the top of the body
 * @param {string} opts.body       - Inner HTML for the message area
 */
const baseLayout = ({ title, heading, body }) => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>

<body style="margin:0; padding:0; background-color:#0b0b18; font-family:'Segoe UI', Arial, sans-serif; color:#e2e8f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b0b18; padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#161629; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%); padding:32px 40px; text-align:center;">
              <span style="display:inline-block; font-size:26px; font-weight:700; color:#ffffff; letter-spacing:-0.5px;">
                <span style="display:inline-block; width:34px; height:34px; line-height:34px; background:rgba(255,255,255,0.2); border-radius:9px; margin-right:8px; text-align:center;">L</span>
                Learnity
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 16px; font-size:22px; font-weight:600; color:#ffffff;">${heading}</h1>
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px; border-top:1px solid rgba(255,255,255,0.08); text-align:center;">
              <p style="margin:0; font-size:13px; color:#6b6b8a;">
                Need help? Reach us at <a href="mailto:info@learnity.com" style="color:#a855f7; text-decoration:none;">info@learnity.com</a>
              </p>
              <p style="margin:8px 0 0; font-size:12px; color:#4b4b66;">© Learnity. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>

</html>`;
};

// A reusable purple CTA button (table-based for Outlook compatibility).
const ctaButton = (label, href) => `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">
    <tr>
      <td align="center" style="border-radius:10px; background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%);">
        <a href="${href}" style="display:inline-block; padding:12px 28px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; border-radius:10px;">${label}</a>
      </td>
    </tr>
  </table>`;

module.exports = { baseLayout, ctaButton };
