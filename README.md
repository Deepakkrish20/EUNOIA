# EUNOIA OS

EUNOIA OS is a modern, high-performance, clean-architecture monorepo framework built to run and synchronize intelligence, tasks, goals, systems, and dashboards under a single system layer.

## 🚀 Tech Stack

### Frontend (`apps/web`)
* **React 19** - UI Framework.
* **Vite** - High-speed bundler/builder.
* **Tailwind CSS** - Utility-first styling.
* **Shadcn UI** - Reusable UI component paradigms.
* **Framer Motion** - Fluid micro-animations and transitions.
* **React Router DOM** - Core single-page route engine.
* **Zustand** - Global UI/client state management.
* **TanStack Query** - Server-side async data cache.
* **Axios** - Standard HTTP client.
* **Clerk** - Authentication wrapper.

### Backend (`apps/server`)
* **Node.js** & **Express** - Fast, unopinionated core web server API.
* **Prisma ORM** - Modern database interface.
* **Clerk SDK** - User identity check validation.
* **Gemini API** - Integration with Google Gemini Large Language Models.

### Database
* **PostgreSQL** - Relational database layer.

### Shared Packages (`packages/*`)
* **`@eunoia-os/ui`** - Design system primitives, styling utilities (`cn`), and shared component boundaries.
* **`@eunoia-os/utils`** - Reusable JavaScript helper methods (formatting, promise controls, etc.).
* **`@eunoia-os/config`** - Centralized shared Tailwind and ESLint configs.
* **`@eunoia-os/shared`** - System-wide model validation schemas, constant lists, and paths.

---

## 🛠️ Installation & Setup

1. **Install Dependencies:**
   Install all node dependencies across all workspaces and establish symlinks:
   ```bash
   npm install
   ```

2. **Database Preparation:**
   Create an `.env` file under `apps/server/` containing:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/eunoia_db?schema=public"
   CLERK_SECRET_KEY="sk_test_..."
   CLERK_PUBLISHABLE_KEY="pk_test_..."
   GEMINI_API_KEY="AIzaSy..."
   ```

   Run Prisma migrations and client generators:
   ```bash
   npm run prisma:generate --workspace=apps/server
   ```

3. **Frontend Preparation:**
   Create an `.env.local` file under `apps/web/` containing:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY="pk_test_..."
   ```

---

## ⚙️ Running the Project

Run development servers concurrently:
```bash
npm run dev
```

Run target applications individually:
* **Web Frontend:** `npm run dev:web` (Runs on `http://localhost:3000`)
* **Express Server:** `npm run dev:server` (Runs on `http://localhost:5000`)

---

## 🧹 Quality Gates & Linting

We enforce formatting and syntax verification before commits:
* **Check Formats:** `npm run format:check`
* **Format Files:** `npm run format`
* **Linting:** `npm run lint`
* **Husky & Lint-Staged:** Runs `eslint` and `prettier` automatically on staged changes during `git commit`.
