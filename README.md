# Jobeee — Frontend

Web client for **Jobeee**, a job-board application. A single-page app where job
seekers browse and apply to jobs, employers post listings and manage applicants,
and admins oversee the platform. Built with **React + Vite + Tailwind CSS**.

> Talks to the Jobeee API (Express/MongoDB) in the `jobeee_api` repo.

---

## Features

### For everyone
- Register / login with role selection (job seeker or employer).
- **Browse jobs** with a powerful search & filter panel:
  - Keyword search, plus **Location, Company, Job Type, Industry, Salary range** filters.
  - **Sort** (newest, salary high↔low) and **pagination**.
- Job detail view and **apply** flow (cover letter + résumé upload).

### Job seeker
- **Dashboard** with live application stats (total / pending / shortlisted / rejected)
  and recent activity.
- **My Applications** — track status across the `pending → shortlisted → interview
  → hired` (+ rejected) pipeline.
- **Saved Jobs** — bookmark listings (one-tap toggle) and revisit them later.
- **Profile** — edit name, phone, headline, skills; **upload an avatar** (instant
  preview); **change password**.

### Employer
- **Overview dashboard** with real, auto-refreshing metrics (active listings, total
  applications, shortlisted, interviews) and recent listings with live applicant counts.
- **Post / edit / delete** jobs.
- **Applicants** — review candidates, **advance their status** through the hiring
  pipeline, and **view résumés** (fetched securely with auth).
- Employer profile (shared profile page).

### Admin
- **Dashboard & analytics** with platform-wide metrics and an application
  status breakdown.
- **Manage users** (search, delete) and **manage jobs** (search, remove).

### Cross-cutting
- Token-based auth stored client-side; **centralized 401 handling** (auto sign-out
  on expiry) and resilient profile loading (no logout on transient errors).
- Toast notifications, loading skeletons, and empty/error states throughout.
- Responsive layout with light/dark theming.

---

## Tech stack

- **React 19** + **Vite**
- **Tailwind CSS**
- **react-router-dom** (routing), **axios** (HTTP), **react-hook-form** (forms),
  **react-hot-toast** (notifications), **lucide-react** (icons)

---

## Getting started

### Prerequisites
- Node.js 18+
- The **Jobeee API** running (locally on `http://localhost:3000` or deployed).

### Install & run
```bash
npm install
cp .env.example .env       # set API URLs
npm run dev                # http://localhost:5173
```

### Environment variables (`.env`)
Vite env vars are baked in at **build time** — set them before building/deploying.

| Variable | Purpose | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the API (**include `/api`**) | `http://localhost:3000/api` |
| `VITE_UPLOADS_URL` | Where the API serves uploaded files | `http://localhost:3000/uploads` |

Both fall back to `localhost:3000` if unset (fine for local dev).

### Scripts
```bash
npm run dev        # dev server (HMR)
npm run build      # production build -> dist/
npm run preview    # preview the production build
npm run lint       # ESLint
```

---

## Project structure

```
src/
  api/            axios instance + API modules (auth, jobs, users, applications)
  context/        AuthContext (session/user state)
  hooks/          useAuth, useJobs, useSavedJobs, useEmployerStats, useAdminStats, …
  components/     layout (Navbar), dashboard sidebars, job modals, ui
  layouts/        Dashboard / Employer / Admin layouts
  pages/
    auth/         Login, Register
    jobs/         Browse, Job detail, Create job
    dashboard/    Job-seeker home, Applications, Saved jobs, Profile
    employer/     Home, Jobs, Applicants, Applicant detail
    admin/        Home, Users, Jobs, Analytics
  routes/         AppRoutes + Protected/Role/Guest route guards
```

---

## How it connects to the backend
- All requests go through `src/api/axios.js`, which prepends `VITE_API_URL`, attaches
  the JWT from `localStorage`, and on a `401` clears the session and redirects to login.
- Applications are addressed by a composite id (`<jobId>__<applicantId>`) that the API
  layer splits when talking to the backend.
- Résumés are **not** public URLs — the employer detail page fetches them as an
  authenticated blob and opens them in a new tab.

---

## Deployment
- Build a static bundle (`npm run build`) and host on Vercel / Netlify / Cloudflare Pages.
- Add a **SPA fallback** so client routes work on refresh (e.g. Vercel `rewrites`
  all paths → `/index.html`, or Netlify `/* /index.html 200`).
- Set `VITE_API_URL` (with `/api`) and `VITE_UPLOADS_URL` to your deployed API, then
  **redeploy** (Vite inlines env vars at build time).
- Ensure the deployed API's CORS allows this origin (the API auto-allows `*.vercel.app`).
