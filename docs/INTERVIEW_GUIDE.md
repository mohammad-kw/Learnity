# Learnity — Interview Guide

How to present and discuss Learnity in interviews. Use this to prepare a **concise pitch**, explain **technical decisions**, and handle **deep-dive questions**.

---

## 1. The 30-Second Pitch

> "Learnity is a full-stack MERN ed-tech platform where instructors publish paid video courses and students purchase and learn from them. It has JWT auth with email OTP verification, Razorpay payments, Cloudinary media hosting, course progress tracking, ratings and reviews, and a full admin panel. I built it with React, Redux Toolkit, Tailwind, Express, and MongoDB, and made it production-ready with environment-based config, lazy-loaded routes, and a responsive glassmorphism UI."

---

## 2. The 2-Minute Walkthrough

1. **Frontend:** React 18 SPA, React Router v6 with lazy-loaded routes, Redux Toolkit for global state (auth, cart, course, profile), Tailwind for styling.
2. **Backend:** Express REST API organized in routes → controllers → models, JWT auth middleware with role-based guards (student/instructor/admin).
3. **Database:** MongoDB with Mongoose; models for users, courses, sections, reviews, progress, etc.
4. **Integrations:** Razorpay for payments, Cloudinary for media (with a local-storage fallback for dev), Nodemailer for branded transactional emails.
5. **Production readiness:** all secrets in env vars, CORS locked to a configured origin, OTP exposure toggled off in prod, SPA rewrites for Vercel.

---

## 3. Key Technical Decisions (and why)

| Decision                                        | Why                                                                                                  |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Redux Toolkit** over Context                  | Predictable global state for auth/cart/course flows; less boilerplate than classic Redux.            |
| **Lazy-loaded routes**                          | Smaller initial bundle, faster first paint.                                                          |
| **Local-storage fallback for media**            | Lets contributors run the app without a Cloudinary account; `STORAGE` env switches to cloud in prod. |
| **OTP email verification**                      | Confirms real emails before account creation; `EXPOSE_OTP` allows dev without SMTP.                  |
| **Layered backend (routes/controllers/models)** | Separation of concerns, testability, readability.                                                    |
| **JWT in Authorization header**                 | Stateless auth that scales; role middlewares centralize access control.                              |
| **Env-prefixed frontend config**                | CRA only exposes `REACT_APP_*`, preventing accidental secret leakage into the bundle.                |

---

## 4. Likely Interview Questions

### Architecture

- _Walk me through what happens when a user logs in._
  → Credentials posted → controller verifies with bcrypt → JWT signed → returned → stored in Redux + localStorage → attached to future requests → verified by `auth` middleware.

- _How do you protect routes on the frontend and backend?_
  → Frontend: `OpenRoute`/`PrivateRoute` wrappers. Backend: `auth` middleware verifies JWT, then `isStudent`/`isInstructor`/`isAdmin` guards enforce roles.

### Payments

- _How does the Razorpay flow work securely?_
  → Backend creates the order (secret key never leaves the server). Frontend opens checkout with the **public** key. On success, backend **verifies the signature** before enrolling — so the client can't fake a payment.

### State & Performance

- _Why Redux and not just local state?_
  → Auth token, cart, and multi-step course creation are needed across many components; Redux centralizes them.
- _How did you improve startup performance?_
  → Lazy-loading routes, `preload="none"` on hero video, removing unnecessary eager imports.

### Data Modeling

- _How are courses structured?_
  → `Course` → many `Section` → many `SubSection` (each with video + duration). Enrollment is a many-to-many between `User` and `Course`. Progress tracked per user per course in `CourseProgress`.

### Security

- _How are passwords stored?_ → Hashed with bcrypt, never in plaintext.
- _How do you prevent unauthorized API access?_ → JWT verification + role middleware + CORS restricted to the known frontend origin.
- _What about secrets?_ → All in env files, never committed; `.env.example` documents them.

---

## 5. Talking About Challenges (STAR-style)

Have 2–3 ready. Examples (see [`ISSUES_AND_FIXES.md`](./ISSUES_AND_FIXES.md) for full detail):

**Razorpay key never reaching the browser**

- _Situation:_ Payments silently failed in the browser.
- _Task:_ Find why the Razorpay key was undefined.
- _Action:_ Discovered CRA only exposes `REACT_APP_`-prefixed vars; the code read a non-prefixed variable. Renamed to `REACT_APP_RAZORPAY_KEY`.
- _Result:_ Checkout worked; learned the CRA env exposure rule.

**Stale lazy-chunk crash after edits**

- _Situation:_ Pages threw "Lazy element type must resolve to a class or function".
- _Task:_ Diagnose without breaking working code.
- _Action:_ Traced it to a transient double-default-export during editing that poisoned the cached lazy chunk; cleared the webpack cache and forced a clean rebuild.
- _Result:_ Understood how `React.lazy` caches rejected module promises.

---

## 6. Metrics / Scope to Mention

- ~11 Mongoose models, 7 route groups, role-based access for 3 user types.
- Full feature set: auth, payments, media, reviews, progress, admin.
- Responsive UI with mobile drawer navigation.
- Production config for Vercel + Render + Atlas + Cloudinary.

---

## 7. Questions YOU Can Ask Back

- "How does your team handle media storage at scale?"
- "Do you use feature flags similar to my `STORAGE`/`EXPOSE_OTP` toggles?"
- "How do you structure your React state for large apps?"

---

## 8. One-Liner Summary to Memorize

> "A production-ready MERN ed-tech platform with secure auth, payments, media hosting, and an admin panel — designed with clean layering, env-based configuration, and a polished responsive UI."
