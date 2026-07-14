const { baseLayout } = require("./_layout");

exports.passwordUpdated = (email, name) => {
  const body = `
    <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#a3a3c2;">
      Hi <strong style="color:#e2e8f0;">${name}</strong>,
    </p>
    <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#a3a3c2;">
      Your Learnity password was successfully updated for
      <span style="color:#c4b5fd; font-weight:600;">${email}</span>.
    </p>
    <div style="margin:8px 0 0; padding:14px 18px; background:rgba(234,179,8,0.1); border:1px solid rgba(234,179,8,0.3); border-radius:10px;">
      <p style="margin:0; font-size:14px; line-height:1.6; color:#fde68a;">
        ⚠️ If you didn't make this change, please contact us immediately to secure your account.
      </p>
    </div>`;

  return baseLayout({
    title: "Password Update Confirmation",
    heading: "Password updated 🔒",
    body,
  });
};
