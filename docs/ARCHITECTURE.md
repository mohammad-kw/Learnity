# Learnity — Project Architecture

This document explains **how Learnity is designed and how its pieces fit together**.

---

## 1. High-Level Overview

Learnity is a classic **three-tier MERN application**:

```
┌─────────────┐     HTTPS/JSON      ┌─────────────┐     Mongoose      ┌─────────────┐
│   React     │  ───────────────▶   │   Express   │  ──────────────▶  │  MongoDB    │
│  (client)   │  ◀───────────────   │   (server)  │  ◀──────────────  │  (Atlas)    │
└─────────────┘                     └─────────────┘                   └─────────────┘
       │                                   │
       │                                   ├──▶ Cloudinary (media)
       │                                   ├──▶ Razorpay (payments)
       └──▶ Razorpay Checkout (browser)    └──▶ SMTP / Nodemailer (email)
```

- **Client (React)** — UI, routing, state management, calls the REST API.
- **Server (Express)** — REST API, business logic, auth, integrations.
- **Database (MongoDB)** — persistent storage via Mongoose ODM.
- **Third-party services** — Cloudinary, Razorpay, SMTP email.

---

## 2. Frontend Architecture

### 2.1 Routing (`src/App.js`)

- Uses **React Router v6**.
- All route components are **lazy-loaded** with `React.lazy` + `Suspense` for faster initial load and code-splitting.
- Route guards:
  - `OpenRoute` — only for logged-out users (login/signup).
  - `PrivateRoute` — only for authenticated users (dashboard).

### 2.2 State Management (Redux Toolkit)

Slices in `src/slices/`:
| Slice | Responsibility |
|---|---|
| `authSlice` | token, signup data, loading |
| `profileSlice` | logged-in user object |
| `cartSlice` | cart items, total, count |
| `courseSlice` | course being created/edited, steps |
| `viewCourseSlice` | active course, completed lectures |

Store is configured in `src/reducer/index.js` and provided at the app root.

### 2.3 API Layer (`src/services/`)

- **`apis.js`** — central registry of every backend endpoint (uses `REACT_APP_BASE_URL`).
- **`apiconnector.js`** — thin Axios wrapper (`apiConnector(method, url, body, headers, params)`).
- **`operations/`** — feature-grouped async functions that call the API, dispatch Redux actions, and fire toasts:
  - `authAPI.js`, `profileAPI.js`, `courseDetailsAPI.js`, `studentFeaturesAPI.js`, `SettingsAPI.js`, `adminAPI.js`, `pageAndComponentData.js`.

### 2.4 Component Organization (`src/components/`)

- **`common/`** — shared UI (Navbar, Footer, Spinner, ReviewSlider, FAQ, etc.).
- **`core/`** — feature modules (Dashboard, AddCourse, ViewCourse, Auth, Catalog, HomePage, AboutPage).
- **`ContactPage/`** — contact form pieces.

### 2.5 Styling

- **Tailwind CSS** with a custom theme (`tailwind.config.js`): `richblack` scale, `purple` brand palette, gradients, glass-card utilities, `shadow-purple-glow`.
- Design language: dark background + purple gradients + glassmorphism cards.

---

## 3. Backend Architecture

### 3.1 Entry Point (`server/index.js`)

Sets up: JSON/body parsing, cookie parser, **CORS** (origin from `CORS_ORIGIN`), `express-fileupload`, static `/uploads` serving, Cloudinary connect, and mounts routers under `/api/v1/*`.

### 3.2 Layered Structure

```
routes/  ──▶  controllers/  ──▶  models/
   │              │
   │              └──▶ utils/ (mailSender, imageUploader, secToDuration)
   └──▶ middlewares/auth.js (JWT verify + role guards)
```

- **Routes** map URLs to controllers and attach middleware.
- **Controllers** hold business logic.
- **Models** are Mongoose schemas.
- **Middlewares** — `auth` (verify JWT), `isStudent`, `isInstructor`, `isAdmin`.
- **Utils** — reusable helpers.

### 3.3 API Route Groups

| Base path          | Router   | Purpose                                                 |
| ------------------ | -------- | ------------------------------------------------------- |
| `/api/v1/auth`     | User     | signup, login, OTP, reset password                      |
| `/api/v1/profile`  | Profile  | user details, enrolled courses, instructor dashboard    |
| `/api/v1/course`   | Course   | CRUD courses/sections/subsections, categories, progress |
| `/api/v1/payment`  | Payments | Razorpay capture/verify, free enroll, success email     |
| `/api/v1/reach`    | Contact  | contact form                                            |
| `/api/v1/category` | Category | course categories                                       |
| `/api/v1/admin`    | Admin    | admin management endpoints                              |

### 3.4 Data Models (`server/models/`)

`User`, `Profile`, `Course`, `Section`, `SubSection`, `Category`, `CourseProgress`, `RatingAndReview`, `OTP`, `ContactMessage`, `Announcement`.

Key relationships:

- `User` 1—1 `Profile`
- `User (instructor)` 1—N `Course`
- `Course` N—N `User (students enrolled)`
- `Course` 1—N `Section` 1—N `SubSection`
- `Course` 1—N `RatingAndReview`
- `User` 1—N `CourseProgress` (per course)

---

## 4. Authentication Flow

1. **Signup:** user requests OTP → OTP stored + emailed → user submits form + OTP → verified → account created (password hashed with bcrypt).
2. **Login:** credentials verified → **JWT** issued → stored in Redux + localStorage → sent as `Authorization: Bearer <token>`.
3. **Protected requests:** `auth` middleware verifies JWT; role middlewares enforce access.
4. **Reset password:** email with token link → user sets new password.

---

## 5. Media Storage Strategy

`server/utils/imageUploader.js` supports two modes controlled by `STORAGE`:

- **`local`** (default, dev): files saved to `server/uploads/`, served via `/uploads`.
- **`cloudinary`** (production): files uploaded to Cloudinary; URLs stored in DB.

This lets development work with **no Cloudinary account**, while production uses durable cloud storage.

---

## 6. Payment Flow (Razorpay)

1. Student clicks Buy → frontend calls `capturePayment` → backend creates a Razorpay **order**.
2. Frontend opens **Razorpay Checkout** with `REACT_APP_RAZORPAY_KEY`.
3. On success, frontend calls `verifyPayment` → backend verifies signature → enrolls student → sends payment success email.
4. Free courses skip Razorpay via `enrollCourseFree`.

---

## 7. Email System

- `server/utils/mailSender.js` sends via Nodemailer SMTP with a proper named sender.
- Templates in `server/mail/templates/` share a branded `_layout.js` (Learnity header, purple gradient, footer).
- Emails: OTP verification, course enrollment, payment success, password update, contact form response.

---

## 8. Configuration & Environments

- Frontend env: `REACT_APP_*` only (baked at build time).
- Backend env: loaded via `dotenv` at startup.
- `EXPOSE_OTP` toggles dev-friendly OTP exposure; must be `false` in production.
- `CORS_ORIGIN` restricts which frontend can call the API.

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for production topology.
