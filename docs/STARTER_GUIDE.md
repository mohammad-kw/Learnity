# Learnity — Starter Guide (for absolute beginners)

Never seen this project before? Start here. This guide assumes **no prior knowledge** of Learnity and walks you from zero to a running app, then explains what you're looking at.

---

## Part 1 — What is Learnity?

Learnity is a website where:

- **Instructors** create online courses (videos, sections, price).
- **Students** browse courses, pay for them, and watch the lessons.
- **Admins** manage everything behind the scenes.

It's built with the **MERN stack**:

- **M**ongoDB — the database (where data is stored)
- **E**xpress — the backend server (the "brain" / API)
- **R**eact — the frontend (what you see in the browser)
- **N**ode.js — runs the backend JavaScript

There are **two apps** in one repository:

1. The **frontend** (folder: `src/`) → runs on `http://localhost:3000`
2. The **backend** (folder: `server/`) → runs on `http://localhost:4000`

They talk to each other over HTTP.

---

## Part 2 — Install the tools you need

1. **Node.js** (version 18 or newer) — https://nodejs.org
2. **pnpm** (the package manager this project uses). After installing Node:
   ```bash
   corepack enable
   corepack prepare pnpm@10.4.1 --activate
   ```
3. **A code editor** — VS Code recommended.
4. **A MongoDB database** — easiest is a free **MongoDB Atlas** cloud database:
   - Go to https://cloud.mongodb.com → create a free cluster → **Connect** → **Drivers** → copy the connection string.

---

## Part 3 — Get the project running

### Step 1: Install dependencies

Open a terminal in the project root (`Lernity/`):

```bash
corepack pnpm install
cd server
corepack pnpm install
cd ..
```

### Step 2: Create your environment files

"Environment files" hold secret settings (database URL, keys). There are two example files — copy them:

```bash
cp .env.example .env
cp server/.env.example server/.env
```

Now open **`server/.env`** and fill in at minimum:

```
MONGODB_URL=<paste your Atlas connection string>
JWT_SECRET=any-long-random-text-you-make-up
```

Leave the rest as-is for now. With `STORAGE=local` and `EXPOSE_OTP=true`, the app works **without** Cloudinary, Razorpay, or a real email account during development.

Open **`.env`** (frontend) and make sure it has:

```
REACT_APP_BASE_URL=http://localhost:4000/api/v1
```

### Step 3: Start everything

```bash
corepack pnpm run dev
```

This starts **both** the frontend and backend together. Wait until you see:

- `App is running at 4000` and `DB Connected Successfully` (backend ✅)
- `Compiled successfully!` (frontend ✅)

Then open **http://localhost:3000** in your browser. 🎉

---

## Part 4 — Understand what you're looking at

### The folders that matter most

| Folder                | What lives here                                 |
| --------------------- | ----------------------------------------------- |
| `src/pages/`          | Full pages (Home, Login, Dashboard, Contact...) |
| `src/components/`     | Reusable UI pieces (Navbar, Footer, buttons...) |
| `src/services/`       | Code that talks to the backend                  |
| `src/slices/`         | Global app state (Redux)                        |
| `server/routes/`      | Backend URLs (the API endpoints)                |
| `server/controllers/` | What each endpoint actually does                |
| `server/models/`      | The shape of data stored in MongoDB             |

### How a click becomes data (simple version)

1. You click a button in a **page** (`src/pages`).
2. It calls a function in **services/operations**.
3. That sends a request to a **route** in the backend (`server/routes`).
4. The route runs a **controller** (`server/controllers`).
5. The controller reads/writes the **database** using a **model** (`server/models`).
6. The answer travels all the way back to your screen.

---

## Part 5 — Try these first tasks

1. **Sign up** as a student. (Because `EXPOSE_OTP=true`, the OTP is shown to you without needing email set up.)
2. Log in and explore the **Dashboard**.
3. Sign up a second account as an **Instructor** and create a course.
4. Look at `src/pages/Home.jsx` and change some text — the browser auto-refreshes.

---

## Part 6 — Common beginner questions

**Q: Nothing loads / API errors?**
Make sure the backend printed `DB Connected Successfully`. If not, your `MONGODB_URL` is wrong.

**Q: I changed `.env` but nothing happened.**
Frontend env variables are read **only when the dev server starts**. Stop (`Ctrl+C`) and run `corepack pnpm run dev` again.

**Q: Do I need Cloudinary/Razorpay/email to develop?**
No. Defaults (`STORAGE=local`, `EXPOSE_OTP=true`) let you develop without them. You only need real keys for production or to test those specific features.

**Q: Where do I change the API address?**
`REACT_APP_BASE_URL` in the frontend `.env`.

---

## Part 7 — Where to go next

- Read [`ARCHITECTURE.md`](./ARCHITECTURE.md) to understand the design.
- Skim [`DIAGRAMS.md`](./DIAGRAMS.md) for visuals.
- When ready to deploy, follow [`DEPLOYMENT.md`](./DEPLOYMENT.md).

Welcome to Learnity! 💜
