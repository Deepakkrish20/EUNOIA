# EUNOIA OS Environment Setup Guide

This document is the developer onboarding guide for setting up local database services, identity parameters, and development tools.

---

## 📋 Prerequisites

Before running EUNOIA OS, ensure you have the following installed on your system:
* **Node.js:** v20.x or higher
* **npm:** v10.x or higher
* **PostgreSQL:** v15 or higher (local or managed instance)

---

## 🛠️ Environmental Variable Keys

You must create and populate the configuration environment files before running the workspace application layers.

### 1. Web Client (`apps/web/.env.local`)
Create a local env file for your browser app:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base endpoint URL pointing to the Express server API | `http://localhost:5000` |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk integration publishable key | `pk_test_...` |

### 2. Express Server (`apps/server/.env`)
Create a local env file for your API server:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Local network port for Express connections listener | `5000` |
| `DATABASE_URL` | PostgreSQL connection pool URL string | `postgresql://user:pwd@localhost:5432/eunoia` |
| `CLERK_SECRET_KEY` | Clerk integration private verification credential | `sk_test_...` |
| `GEMINI_API_KEY` | Google Gemini API credential | `AIzaSy...` |

---

## 🚀 Step-by-Step Onboarding Setup

1. **Workspace Dependency Installation:**
   Run the package manager from the root workspace directory:
   ```bash
   npm install
   ```
   This installs all global lint configurations, links the workspaces, and initializes the Git pre-commit hooks (`prepare` -> `husky`).

2. **Configure Database Schema:**
   Apply Prisma models migration scripts directly to your target PostgreSQL database instance:
   ```bash
   npm run prisma:migrate --workspace=apps/server
   ```
   This synchronizes table structures and indexes, and automatically runs `prisma generate` to compile the database client.

3. **Verify Scaffolding Compiles:**
   Ensure there are no compilation or styling check warnings:
   ```bash
   npm run lint && npm run format:check
   ```

4. **Launch Dev Instances:**
   Run backend APIs and web interfaces concurrently:
   ```bash
   npm run dev
   ```
   * **React Client:** `http://localhost:3000`
   * **Express Server:** `http://localhost:5000`
   * **Server Health:** `http://localhost:5000/health`
