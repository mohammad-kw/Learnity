# Learnity — New Functionality Added

This document describes the **new features and enhancements** added on top of the original base project.

---

## 1. Admin Management Area

A dedicated admin surface for platform operators.

- **Admin dashboard** with platform statistics.
- **Manage Users** — view/administer platform users.
- **Manage Courses** — oversee all courses across instructors.
- **Manage Categories** — create and organize course categories (`AddCategory`).
- **Manage Reviews** — moderate ratings & reviews.
- **Manage Messages** — read contact-form submissions.
- **Manage Instructors** — oversee instructor accounts.
- **Manage Announcements** — create/remove platform announcements.

Backed by: `server/routes/Admin.js`, `server/controllers/Admin.js`, and admin pages under `src/pages/Admin/`.

---

## 2. Announcements System

- New `Announcement` model (`server/models/Announcement.js`).
- An **AnnouncementBanner** component displayed app-wide (`src/components/common/AnnouncementBanner`).
- Admin management page to create and delete announcements.

Use case: platform-wide notices (maintenance, promotions, new features).

---

## 3. Persistent Contact Messages

- New `ContactMessage` model stores contact-form submissions in the database.
- Admins can review them via **Manage Messages**.
- Paired with a branded contact-form response email.

Previously, contact submissions weren't retained for admin review.

---

## 4. Unenroll from a Course

- Students can **unenroll** from a course they no longer want.
- Endpoint: `UNENROLL_COURSE_API` → `/profile/unenrollCourse`.
- Surfaced in the student's enrolled-courses view.

---

## 5. All-Courses Page with Search

- A dedicated `AllCourses` page (`src/pages/AllCourses.jsx`) listing every course.
- **Client-side search** filters courses by query as you type.
- Responsive grid of course cards.

Improves discoverability beyond category-based browsing.

---

## 6. Course Progress Tracking (surfaced)

- `CourseProgress` tracks completed sub-sections per user per course.
- Progress is reflected in the learning UI (ViewCourse) and dashboards.

---

## 7. Branded Transactional Emails

- Shared branded email layout (`_layout.js`) with a Learnity header, purple gradient, "L" badge, and footer.
- Consistent, professional emails for: OTP verification, enrollment, payment success (with receipt), password update, and contact response.

---

## 8. Dual-Mode Media Storage

- `imageUploader.js` supports **local disk** (dev) or **Cloudinary** (prod) via the `STORAGE` env variable.
- Lets contributors run the full app **without a Cloudinary account**.

---

## 9. Developer-Friendly OTP Mode

- `EXPOSE_OTP` env flag reveals the signup OTP in dev so the flow works **without a real mail server**.
- Must be set to `false` in production.

---

## 10. UX / Quality Enhancements

- **Responsive dashboard sidebar** with a mobile drawer.
- **Lazy-loaded routes** for faster startup.
- **Redesigned Home, About, Footer, ReviewSlider, FAQ** for a cohesive, modern look.
- **Branded favicon** (gradient "L").
- Cleaner codebase (removed debug logs, dead code, and an unused admin feature).

---

## Feature → Code Map (quick reference)

| Feature              | Key files                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Admin area           | `src/pages/Admin/*`, `server/routes/Admin.js`, `server/controllers/Admin.js`                                       |
| Announcements        | `server/models/Announcement.js`, `src/components/common/AnnouncementBanner`, `src/pages/Admin/ManageAnnouncements` |
| Contact messages     | `server/models/ContactMessage.js`, `src/pages/Admin/ManageMessages`                                                |
| Unenroll             | `services/apis.js` (`UNENROLL_COURSE_API`), profile controller/route                                               |
| All courses + search | `src/pages/AllCourses.jsx`                                                                                         |
| Progress             | `server/models/CourseProgress.js`, ViewCourse UI                                                                   |
| Emails               | `server/mail/templates/*`, `server/utils/mailSender.js`                                                            |
| Media storage        | `server/utils/imageUploader.js` (`STORAGE`)                                                                        |
| OTP dev mode         | `EXPOSE_OTP` in `server/.env`                                                                                      |
