<div id="top"></div>
<div align="center">
  <h1>Learnity 🎓</h1>
  <h2>Learn. Grow. Excel. — An Online Education Platform</h2>
</div>

<br>

Learnity is a fully-featured **MERN-stack ed-tech platform** where instructors create and publish courses, and students browse, purchase, and learn from them. It features a modern glassmorphism UI with a purple brand theme, secure authentication, payments, media hosting, ratings & reviews, progress tracking, and a full admin panel.

> Learnity is a rebrand and heavy enhancement of a StudyNotion-style project — redesigned end-to-end with a consistent Learnity identity, new features, performance improvements, branded emails, and production-ready configuration.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Documentation](#-documentation)
- [Deployment](#-deployment)
- [License](#-license)

---

## ✨ Features

### For Students
- Browse the course catalog by category and search all courses
- Detailed course pages with sections, sub-sections, and previews
- Add to cart and pay securely via **Razorpay**; enroll in free courses instantly
- Watch course videos with **progress tracking**
- Rate and review courses; unenroll when done
- Manage profile, change password, update profile picture

### For Instructors
- Create, edit, and publish courses (sections & sub-sections)
- Upload thumbnails and video lectures (Cloudinary or local storage)
- Instructor dashboard with charts (revenue, enrollments)

### For Admins
- Admin dashboard with platform stats
- Manage users, instructors, courses, categories
- Manage contact messages, reviews, and announcements

### Platform-wide
- JWT authentication with **OTP email verification**
- Forgot/reset password via email
- Branded transactional emails (verification, enrollment, payment, password update, contact)
- Fully responsive (mobile drawer navigation)
- Lazy-loaded routes for faster startup

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Redux Toolkit, React Router 6, Tailwind CSS, Swiper, Chart.js, React Hook Form |
| **Backend** | Node.js, Express 4, Mongoose 7 |
| **Database** | MongoDB (Atlas) |
| **Auth** | JWT, bcrypt, OTP (nodemailer) |
| **Media** | Cloudinary (or local disk fallback) |
| **Payments** | Razorpay |
| **Email** | Nodemailer (SMTP) |
| **Tooling** | pnpm, concurrently, nodemon |

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 📁 Project Structure

```
Lernity/
├── public/                 # Static assets, index.html, favicon
├── src/                    # React frontend
│   ├── components/         # UI components (common, core, ContactPage)
│   ├── pages/              # Route-level pages
│   ├── services/           # API layer (apis.js, apiconnector, operations/)
│   ├── slices/             # Redux slices
│   ├── reducer/            # Root reducer
│   ├── data/               # Static data (links, nav, etc.)
│   ├── hooks/ & utils/     # Helpers
│   └── App.js              # Routes + lazy loading
├── server/                 # Express backend
│   ├── config/             # database, cloudinary, razorpay
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── middlewares/        # auth
│   ├── mail/templates/     # Branded email templates
│   ├── utils/              # imageUploader, mailSender, etc.
│   └── index.js            # Server entry point
├── docs/                   # 📚 Full project documentation
├── .env.example            # Frontend env template
└── vercel.json             # SPA rewrite config
```

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (`corepack enable` then `corepack prepare pnpm@10.4.1 --activate`)
- A MongoDB database (Atlas recommended)

### 1. Clone & install
```bash
git clone <repo-url>
cd Lernity
corepack pnpm install
cd server && corepack pnpm install && cd ..
```

### 2. Configure environment
```bash
cp .env.example .env
cp server/.env.example server/.env
```
Fill in your values. New to the project? See [`docs/STARTER_GUIDE.md`](./docs/STARTER_GUIDE.md) for a beginner-friendly walkthrough of every variable.

### 3. Run in development
```bash
corepack pnpm run dev
```
Runs the React client (port **3000**) and Express server (port **4000**) together via `concurrently`.

- Frontend: http://localhost:3000
- Backend health check: http://localhost:4000

> With the dev defaults (`STORAGE=local`, `EXPOSE_OTP=true`), the app runs **without** Cloudinary, Razorpay, or a real mail server.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 🔑 Environment Variables

**Frontend (`.env`)**
| Variable | Description |
|---|---|
| `REACT_APP_BASE_URL` | Backend API base, e.g. `http://localhost:4000/api/v1` |
| `REACT_APP_RAZORPAY_KEY` | Razorpay public key id |

**Backend (`server/.env`)** — MongoDB, JWT, admin seed, Cloudinary, SMTP, Razorpay, `STORAGE`, `EXPOSE_OTP`. See `server/.env.example`.

> **CRA rule:** only variables prefixed with `REACT_APP_` are exposed to the frontend bundle. Keep server secrets (like the Razorpay **secret**) on the backend only.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 📚 Documentation

All documentation lives in the [`docs/`](./docs) folder:

| Doc | Purpose |
|---|---|
| [`docs/README.md`](./docs/README.md) | Documentation hub |
| [`docs/STARTER_GUIDE.md`](./docs/STARTER_GUIDE.md) | Zero-to-running for someone new to the project |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | How the system is designed |
| [`docs/DIAGRAMS.md`](./docs/DIAGRAMS.md) | Visual flowcharts & ER diagrams |
| [`docs/INTERVIEW_GUIDE.md`](./docs/INTERVIEW_GUIDE.md) | Talk about this project in interviews |
| [`docs/QA.md`](./docs/QA.md) | Project-specific Q&A with answers |
| [`docs/CHANGELOG.md`](./docs/CHANGELOG.md) | Every change made so far |
| [`docs/ISSUES_AND_FIXES.md`](./docs/ISSUES_AND_FIXES.md) | Problems faced & how we solved them |
| [`docs/NEW_FEATURES.md`](./docs/NEW_FEATURES.md) | New functionality added |
| [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) | Production deployment guide |

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 🚢 Deployment

- **Frontend** -> Vercel (SPA rewrites already configured in `vercel.json`)
- **Backend** -> Render / Railway (Node web service, root = `server`)
- **Database** -> MongoDB Atlas
- **Media** -> Cloudinary (`STORAGE=cloudinary`, `EXPOSE_OTP=false` in production)

Full step-by-step: [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md).

<p align="right">(<a href="#top">back to top</a>)</p>

---

## 📝 License

ISC — for educational/portfolio use.

---

Built with 💜 as **Learnity**.
