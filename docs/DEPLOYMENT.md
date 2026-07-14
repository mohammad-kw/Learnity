# Learnity — Deployment Guide

Step-by-step guide to deploy Learnity to production.

**Target topology:**

- **Frontend** → Vercel (static React build)
- **Backend** → Render (Node web service)
- **Database** → MongoDB Atlas
- **Media** → Cloudinary
- **Payments** → Razorpay
- **Email** → SMTP (e.g. Gmail app password)

```
Vercel (React)  ──►  Render (Express)  ──►  MongoDB Atlas
                          │
                          ├──►  Cloudinary
                          ├──►  Razorpay
                          └──►  SMTP
```

---

## Step 0 — Prerequisites (collect your keys)

| Service       | What to get                           | Where                                           |
| ------------- | ------------------------------------- | ----------------------------------------------- |
| MongoDB Atlas | Connection string                     | cloud.mongodb.com → Connect → Drivers           |
| Cloudinary    | `CLOUD_NAME`, `API_KEY`, `API_SECRET` | cloudinary.com dashboard                        |
| Razorpay      | Key ID + Key Secret                   | dashboard.razorpay.com → API Keys               |
| SMTP (Gmail)  | App Password (not login password)     | myaccount.google.com → Security → App passwords |

Push your repository to GitHub first.

---

## Step 1 — Deploy the Backend (Render)

1. On **render.com** → **New** → **Web Service** → connect your GitHub repo.
2. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free (or paid to avoid cold starts)
3. Add **Environment Variables**:
   ```
   PORT=4000
   CORS_ORIGIN=https://<your-frontend>.vercel.app
   MONGODB_URL=<your atlas connection string>
   JWT_SECRET=<long random secret>
   ADMIN_EMAIL=admin@learnity.local
   ADMIN_PASSWORD=<strong password>
   CLOUD_NAME=<cloudinary cloud name>
   API_KEY=<cloudinary api key>
   API_SECRET=<cloudinary api secret>
   FOLDER_NAME=Learnity
   STORAGE=cloudinary
   SERVER_URL=https://<your-backend>.onrender.com
   MAIL_HOST=smtp.gmail.com
   MAIL_USER=<your email>
   MAIL_PASS=<app password>
   EXPOSE_OTP=false
   RAZORPAY_KEY=<razorpay key id>
   RAZORPAY_SECRET=<razorpay key secret>
   ```
   > ⚠️ Production must use `STORAGE=cloudinary` and `EXPOSE_OTP=false`.
4. Deploy. Note the backend URL, e.g. `https://learnity-api.onrender.com`.
5. Verify: open the backend URL — you should see `{"success":true,"message":"Your server is up and running...."}`.

---

## Step 2 — Deploy the Frontend (Vercel)

1. On **vercel.com** → **New Project** → import the same repo.
2. Configure:
   - **Root Directory:** `./` (repo root)
   - **Framework Preset:** Create React App (auto-detected)
   - **Build Command:** `npm run build` (or `pnpm build`)
   - **Output Directory:** `build`
3. Add **Environment Variables**:
   ```
   REACT_APP_BASE_URL=https://<your-backend>.onrender.com/api/v1
   REACT_APP_RAZORPAY_KEY=<razorpay key id>
   ```
4. Deploy. Note the URL, e.g. `https://learnity.vercel.app`.

> `vercel.json` already rewrites all routes to `/`, so refreshing deep links (e.g. `/dashboard`) won't 404.

---

## Step 3 — Connect Frontend & Backend

1. Go back to **Render** and set `CORS_ORIGIN` to your exact Vercel URL (no trailing slash).
2. Save → Render redeploys.
3. Open the Vercel URL and test signup/login.

---

## Step 4 — Post-Deploy Checklist

- [ ] Backend health check returns success JSON.
- [ ] `DB Connected Successfully` in Render logs.
- [ ] Signup works and OTP arrives by email (since `EXPOSE_OTP=false`).
- [ ] Login issues a token and dashboard loads.
- [ ] Course thumbnail/video upload lands in Cloudinary.
- [ ] A test Razorpay payment completes and enrollment + receipt email fire.
- [ ] No CORS errors in the browser console.

---

## Environment Variables Reference

### Frontend (`.env` / Vercel)

| Variable                 | Example                                    |
| ------------------------ | ------------------------------------------ |
| `REACT_APP_BASE_URL`     | `https://learnity-api.onrender.com/api/v1` |
| `REACT_APP_RAZORPAY_KEY` | `rzp_live_xxx`                             |

### Backend (`server/.env` / Render)

| Variable                                                | Notes                |
| ------------------------------------------------------- | -------------------- |
| `PORT`                                                  | `4000`               |
| `CORS_ORIGIN`                                           | exact frontend URL   |
| `MONGODB_URL`                                           | Atlas string         |
| `JWT_SECRET`                                            | long random          |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD`                        | seeded admin         |
| `CLOUD_NAME` / `API_KEY` / `API_SECRET` / `FOLDER_NAME` | Cloudinary           |
| `STORAGE`                                               | `cloudinary` in prod |
| `SERVER_URL`                                            | backend base URL     |
| `MAIL_HOST` / `MAIL_USER` / `MAIL_PASS`                 | SMTP                 |
| `EXPOSE_OTP`                                            | `false` in prod      |
| `RAZORPAY_KEY` / `RAZORPAY_SECRET`                      | Razorpay             |

---

## Notes & Gotchas

- **Render free tier sleeps** after ~15 min idle; the first request afterward takes ~30s. Acceptable for portfolios; upgrade for always-on.
- **Local storage isn't durable** on Render (ephemeral disk) — always use Cloudinary in production.
- **Frontend env vars are baked at build time** — changing them requires a redeploy.
- Keep the Razorpay **secret** only on the backend; never expose it via `REACT_APP_*`.

---

## Optional: Alternate Hosts

- Backend could also run on **Railway**, **Fly.io**, or **Cyclic**.
- Frontend could run on **Netlify** (add an equivalent SPA redirect rule).
