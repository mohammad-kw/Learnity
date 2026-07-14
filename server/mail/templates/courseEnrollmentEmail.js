const { baseLayout, ctaButton } = require("./_layout");

exports.courseEnrollmentEmail = (courseName, name) => {
  const dashboardUrl = `${process.env.CORS_ORIGIN || "http://localhost:3000"}/dashboard/enrolled-courses`;

  const body = `
    <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#a3a3c2;">
      Hi <strong style="color:#e2e8f0;">${name}</strong>,
    </p>
    <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#a3a3c2;">
      You're now enrolled in <span style="color:#c4b5fd; font-weight:600;">"${courseName}"</span> 🎉
      We're thrilled to have you on board!
    </p>
    <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:#a3a3c2;">
      Head over to your dashboard to access the course materials and start learning.
    </p>
    ${ctaButton("Go to My Courses", dashboardUrl)}`;

  return baseLayout({
    title: "Course Enrollment Confirmation",
    heading: "You're enrolled! 🚀",
    body,
  });
};
