# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (defaults to :5173, may use :5174/:5175 if port is taken)
npm run build     # production build
npm run lint      # ESLint
npm run preview   # preview production build
```

No test suite is configured.

## Architecture

**Stack:** Vite + React 19, Tailwind CSS v4, react-router-dom v7, react-hook-form, react-hot-toast, lucide-react, axios.

**Entry point:** `src/main.jsx` — wraps the app in `ThemeProvider` → `AuthProvider` → `AppRoutes`. `App.jsx` is unused.

### Auth & routing

`AuthContext` stores `user`, `loading`, `login`, `logout`. JWT is kept in `localStorage` under `"token"` and attached to every request via an axios interceptor in `src/api/axios.js` (base URL: `http://localhost:3000/api`).

Three route guards in `src/routes/`:
- `ProtectedRoute` — redirects unauthenticated users to `/login`
- `RoleRoute` — redirects wrong-role users to `/jobs`
- `GuestRoute` — (present but not currently wired into AppRoutes)

Three user roles: `user` (applicant), `employer`, `admin`. Login redirects based on role: `admin → /admin`, `employer → /employer`, `user → /dashboard`.

### Route tree

```
/                   DashboardPage (public landing)
/login              LoginPage
/register           RegisterPage
/jobs               JobsPage (ProtectedRoute)
/jobs/:id           JobDetailPage (ProtectedRoute)

/dashboard          DashboardLayout (ProtectedRoute)
  /                 DashboardHomePage
  /profile          ProfilePage
  /applications     ApplicationsPage
  /jobs             MyJobsPage (employer/admin only via RoleRoute)

/employer           EmployerDashboardLayout (RoleRoute: employer, admin)
  /                 EmployerHomePage
  /jobs             EmployerJobsPage
  /jobs/create      CreateJobPage
  /jobs/:id         EmployerJobDetailPage
  /applicants       EmployerApplicantsPage
  /applicants/:id   EmployerApplicantDetailPage

/admin              AdminDashboardLayout (RoleRoute: admin)
  /                 AdminHomePage
  /users            AdminUsersPage
  /jobs             AdminJobsPage
  /jobs/create      CreateJobPage
  /analytics        AdminAnalyticsPage
```

### Layout pattern

Dashboard sections use a layout file in `src/layouts/` (e.g. `EmployerDashboardLayout.jsx`) that renders a sidebar + `<Outlet />`. Pages inside layouts must **not** import or render `<Navbar />`; only standalone pages outside layouts (`JobsPage`, `JobDetailPage`, `DashboardPage`, auth pages) render Navbar directly.

### Tailwind dark mode

Tailwind v4 with no `tailwind.config.js`. Config is CSS-only in `src/index.css`:

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

Dark mode is class-based: `ThemeContext` toggles `.dark` on `document.documentElement` and persists the preference in `localStorage` under `"jobee-theme"`. Always pair light/dark utilities: `bg-white dark:bg-gray-900`, `text-gray-900 dark:text-gray-100`, etc.

### API layer

All API calls live in `src/api/`. Current modules:
- `authApi.js` — `loginUser`, `registerUser`, `getProfile`
- `jobsApi.js` — `getJobs`, `getJob(id)`, `createJob`
- `applicationsApi.js` — `getEmployerApplications`, `getApplication(id)`, `updateApplicationStatus(id, status)` (endpoints: `/applications/v1/…`)

Hooks in `src/hooks/` consume the API: `useAuth`, `useJobs` (returns `{ jobs, loading, fetchJobs }`), `useJob(id)` (returns `{ job, loading, error }`), `useApplications` (returns `{ applications, loading, error, fetchApplications }`), `useApplication(id)` (returns `{ application, setApplication, loading, error }`).

### Color schema

Primary color is **emerald**. Use `emerald-600` for primary actions, `emerald-700` for hover, `emerald-50`/`emerald-950` for tinted backgrounds in light/dark mode, `focus:ring-emerald-500` on inputs. To change the color scheme globally, replace the word `emerald` across all `src/**/*.{jsx,css}` files — no config file to update.

### File-writing on Windows

Source files are **UTF-8 without BOM**. When using PowerShell to read/write JSX/CSS files, always use `[System.IO.File]::ReadAllText/WriteAllText` with `New-Object System.Text.UTF8Encoding $false`. Using `Get-Content`/`Set-Content` with `-Encoding utf8` on PowerShell 5.x corrupts non-ASCII characters (em-dashes, peso sign ₱, emoji).
