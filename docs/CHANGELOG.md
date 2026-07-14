# Learnity — Changelog

A consolidated record of **all changes made** while transforming the base project into Learnity. Grouped by theme rather than strict dates.

---

## 1. Rebranding (StudyNotion → Learnity)

- Renamed the product to **Learnity** throughout the UI, metadata, and emails.
- Updated `public/index.html` title and description to Learnity.
- Replaced the favicon with a branded gradient **"L"** SVG (`public/favicon.svg`), with the PNG kept as a fallback.
- Established a consistent brand identity: purple gradient + glassmorphism dark theme.
- Rebranded all four legal pages (Privacy Policy, Cookie Policy, Terms & Conditions, Report) from the old "Seccouncil" text to Learnity, and filled placeholder fields (dates, contact email, jurisdiction).
- Updated package names to `learnity` / `learnity-server`.

---

## 2. UI / UX Redesign

- **Home page:** redesigned for consistent spacing rhythm (`py-16 lg:py-24`), removed empty/awkward gaps, removed the "Explore Full Catalog" band and "Learning Language" section for a tighter layout.
- **About page:** full redesign with consistent spacing; fixed hero text overlapping banner images.
- **Footer:** completely redesigned — modern 12-column layout, brand block with newsletter signup, tidy Company/Explore/Legal link columns, and rounded social buttons. Removed old cluttered lists and unused imports.
- **ReviewSlider:** removed the ugly border box, switched to glassmorphism cards, fixed uneven card heights (stretch + `mt-auto`), added a scoped Swiper class with CSS to align slide heights.
- **FAQ:** normalized vertical padding to match the section rhythm.
- **Stats (About):** added vertical padding for breathing room.

---

## 3. Responsiveness

- **Dashboard sidebar:** added a mobile hamburger + slide-in drawer pattern; desktop remains a fixed sidebar (`hidden md:flex`). Drawer closes on link tap and overlay click.
- `SidebarLink` accepts an optional `onClick` to close the mobile drawer alongside existing behavior.

---

## 4. Email System Overhaul

- Added a shared branded layout `server/mail/templates/_layout.js` exporting `baseLayout()` and `ctaButton()` — dark theme, purple gradient header with an "L" badge + "Learnity" wordmark, inlined table-based styles, and a footer.
- Rewrote all templates to use the shared layout while preserving their function signatures:
  - Email verification (OTP)
  - Course enrollment
  - Payment success (with receipt table; fixed leftover old branding)
  - Password update (amber warning callout)
  - Contact form response (details table)
- Fixed the mail sender's `from` field to a proper named sender: `Learnity <MAIL_USER>`.

---

## 5. Integration Fixes & Hardening

- **Razorpay (frontend):** fixed the checkout key to read `process.env.REACT_APP_RAZORPAY_KEY` (CRA only exposes `REACT_APP_`-prefixed vars) — previously it read a non-prefixed variable that was always `undefined` in the browser.
- **SMTP:** corrected the sender formatting to avoid rejection by mail servers.
- **Media storage:** confirmed/【maintained the dual-mode uploader — `STORAGE=local` (default) or `STORAGE=cloudinary` — so the app runs without a Cloudinary account in development.
- Completed both `.env.example` files (frontend + server) documenting every variable, with production notes (`STORAGE=cloudinary`, `EXPOSE_OTP=false`).

---

## 6. Performance

- Converted route components in `src/App.js` to **lazy-loaded** imports with `<Suspense>` (code-splitting).
- Set `preload="none"` and `playsInline` on the hero video to avoid eager loading a large asset at startup.
- Investigated slow startup and attributed it to dev-mode + a large hero video + initial API calls.

---

## 7. Code Cleanup

- Removed debug `console.log`s across many frontend API/operation and component files (kept intentional catch-block error logs and the dev OTP log).
- Deleted large blocks of commented-out legacy code in `server/controllers/Course.js` (createCourse & getCourseDetails legacy versions).
- Removed an unused `updateUserRole` feature from the admin controller, routes, admin API operation, and endpoint registry.
- Renamed the imported `Course_Card` component usage to `CourseCard` in `AllCourses.jsx` to satisfy React's PascalCase lint rule and remove the last build warning.

---

## 8. New Features Added

(See [`NEW_FEATURES.md`](./NEW_FEATURES.md) for details.)

- Admin management area (users, courses, categories, reviews, messages, announcements).
- Announcements (model + banner + admin management).
- Contact messages persistence (`ContactMessage` model).
- Unenroll from a course.
- All-courses page with client-side search.
- Course progress tracking surfaced in the UI.

---

## 9. Documentation

- Added the `docs/` folder with: updated README, architecture, diagrams, starter guide, interview guide, Q&A, this changelog, issues-and-fixes, new-features, and deployment guide.

---

## 10. Deployment Preparation

- Confirmed `vercel.json` SPA rewrites.
- Documented full deployment topology (Vercel + Render + Atlas + Cloudinary) in `DEPLOYMENT.md`.
- Externalized all configuration to environment variables.
