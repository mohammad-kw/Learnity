# Learnity — Project Q&A

A comprehensive list of questions someone might ask about this project, with answers. Grouped by topic.

---

## A. General / Product

**Q: What is Learnity?**
A full-stack MERN ed-tech platform for creating, selling, and taking online video courses, with roles for students, instructors, and admins.

**Q: Who are the users?**

- **Students:** browse, buy, and learn.
- **Instructors:** create and manage courses.
- **Admins:** manage users, courses, categories, reviews, messages, announcements.

**Q: Is Learnity original?**
It started from a StudyNotion-style base and was rebranded and significantly extended: new UI/UX, new features (announcements, admin management, unenroll, all-courses search), integration fixes, branded emails, and production configuration.

---

## B. Tech Stack

**Q: What technologies are used?**
React 18, Redux Toolkit, React Router 6, Tailwind CSS, Swiper, Chart.js (frontend); Node.js, Express 4, Mongoose 7 (backend); MongoDB Atlas; Cloudinary; Razorpay; Nodemailer.

**Q: Why Tailwind?**
Rapid, consistent styling with a custom theme (purple brand palette, glassmorphism utilities) without context-switching to separate CSS files.

**Q: Why pnpm?**
Faster, disk-efficient installs; the repo pins `pnpm@10.4.1` via `packageManager` and uses `corepack`.

---

## C. Frontend

**Q: How is routing handled?**
React Router v6 in `src/App.js`. All routes are lazy-loaded with `React.lazy` + `<Suspense>`. Guards `OpenRoute` (logged-out only) and `PrivateRoute` (authenticated only) protect routes.

**Q: How is global state managed?**
Redux Toolkit slices: `authSlice`, `profileSlice`, `cartSlice`, `courseSlice`, `viewCourseSlice`.

**Q: How does the frontend call the backend?**
Through `src/services/apis.js` (endpoint registry) and `apiconnector.js` (Axios wrapper), organized into feature functions under `services/operations/`.

**Q: How is the frontend styled/branded?**
Dark theme with purple gradients and glass cards, defined in `tailwind.config.js` (richblack/purple scales, `gradient-text`, `glass-card`, `shadow-purple-glow`).

**Q: How was startup performance improved?**
Lazy-loaded routes, `preload="none"` on the hero video, and removing unnecessary eager imports.

---

## D. Backend

**Q: How is the backend structured?**
Layered: `routes/` → `controllers/` → `models/`, with `middlewares/` for auth and `utils/` for shared helpers. Entry point is `server/index.js`.

**Q: What are the main API groups?**
`/auth`, `/profile`, `/course`, `/payment`, `/reach` (contact), `/category`, `/admin` — all under `/api/v1`.

**Q: How is authentication implemented?**
JWT issued at login, sent as a Bearer token, verified by `auth` middleware. Role middlewares (`isStudent`, `isInstructor`, `isAdmin`) enforce access. Passwords hashed with bcrypt.

**Q: How does signup verification work?**
An OTP is generated, stored, and emailed. The user submits it with their details; the server verifies before creating the account. `EXPOSE_OTP=true` reveals the OTP in dev so email isn't required.

---

## E. Data & Models

**Q: What are the main models?**
`User`, `Profile`, `Course`, `Section`, `SubSection`, `Category`, `CourseProgress`, `RatingAndReview`, `OTP`, `ContactMessage`, `Announcement`.

**Q: How are courses structured?**
`Course` has many `Section`s, each with many `SubSection`s (video + duration). Enrollment is many-to-many between `User` and `Course`.

**Q: How is progress tracked?**
`CourseProgress` stores completed sub-sections per user per course.

---

## F. Integrations

**Q: How do payments work?**
Backend creates a Razorpay order (secret key stays server-side). Frontend opens Razorpay Checkout with the public key. On success, backend verifies the signature, then enrolls the student and emails a receipt. Free courses use `enrollCourseFree`.

**Q: How is media stored?**
`imageUploader.js` supports `STORAGE=local` (dev, `server/uploads/`) or `STORAGE=cloudinary` (prod). Switchable via env — no code changes.

**Q: How are emails sent?**
Nodemailer via SMTP (`mailSender.js`) with a named sender. Templates share a branded `_layout.js` (Learnity header, purple gradient, footer).

---

## G. Configuration & Security

**Q: How is configuration managed?**
Frontend `.env` (only `REACT_APP_*` exposed) and `server/.env` (loaded by `dotenv`). Both documented via `.env.example`.

**Q: What security measures exist?**
bcrypt password hashing, JWT auth, role-based middleware, CORS locked to `CORS_ORIGIN`, secrets in env files, `EXPOSE_OTP=false` in production.

**Q: Why is `REACT_APP_` important?**
Create React App only injects variables with that prefix into the browser bundle — preventing accidental exposure of server secrets.

---

## H. Deployment

**Q: How is Learnity deployed?**
Frontend on Vercel (static build, SPA rewrites in `vercel.json`), backend on Render/Railway (root = `server`), database on MongoDB Atlas, media on Cloudinary.

**Q: What must change for production?**
`STORAGE=cloudinary`, `EXPOSE_OTP=false`, real `CORS_ORIGIN`, real service keys, and `REACT_APP_BASE_URL` pointing to the deployed backend.

**Q: Does refreshing a deep link break the SPA?**
No — `vercel.json` rewrites all paths to `/` so React Router handles them.

---

## I. Testing / Running

**Q: How do I run it locally?**
`corepack pnpm run dev` runs client (3000) and server (4000) together via `concurrently`.

**Q: Can I run it without Cloudinary/Razorpay/email?**
Yes, with the dev defaults (`STORAGE=local`, `EXPOSE_OTP=true`). Only those specific features need real keys.

---

## J. Possible Follow-ups / Improvements

**Q: What would you add next?**
Automated tests (Jest/RTL, Supertest), refresh-token rotation, video streaming/HLS, search with pagination on the backend, rate limiting, and CI/CD.

**Q: What are current limitations?**
No automated test suite yet; Render free tier cold starts; local storage isn't durable (hence Cloudinary in prod).
