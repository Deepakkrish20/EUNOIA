# EUNOIA OS Coding Standards

This document establishes the code quality rules, folder separation guides, naming standards, state management systems, and verification standards for the **EUNOIA OS** workspace.

---

## 🏷️ Naming Conventions

### 1. Variables & Functions
* **Style:** `camelCase`
* **Rule:** Must be descriptive. Single-letter variables (e.g. `i`, `e`) are prohibited except within loop counters or simple error traps.
* **Example:** `const sessionToken = '';`, `function calculateUserAnalytics() {}`

### 2. React Components
* **Style:** `PascalCase`
* **File Extensions:** Must use `.jsx` for files containing JSX elements, and `.js` for pure logical scripts.
* **Example:** `export function Sidebar() {}` in `Sidebar.jsx`

### 3. CSS Classes & Variables
* **Style:** `kebab-case` for classes, and double dash prefix for custom properties.
* **Example:** `--primary-foreground`, `bg-card-surface`

### 4. Database Models & Tables
* **Style:** `PascalCase` for Prisma model definitions, `camelCase` for model relations.
* **Example:** `model LearningProgress`, `user User`

---

## 📂 Code Layout & Architecture Rules

### 1. Single Responsibility
* File lengths should target under 250 lines of code. If a component grows too large, extract sub-elements into feature-local sub-folders.
* Keep components focused strictly on presentation. Extract API calls, data conversions, or side-effects to custom hooks or services.

### 2. Feature-based Boundaries
* Frontend feature directories (`apps/web/src/features/*`) must hide their inner structure. Other features or routes should strictly import components or stores from the feature's `index.js` file. Cross-referencing files deep inside another feature is not allowed:
  * **Correct:** `import { TwinView } from '@/features/twin';`
  * **Incorrect:** `import { RoadmapList } from '@/features/twin/components/RoadmapList.jsx';`

### 3. Server Module Design
* Backend feature modules (`apps/server/src/modules/*`) must remain self-contained, encapsulating their routing paths and specific database repositories. Common helpers or middleware are accessed through imports from `core/*`.

---

## 🧠 State Management Rules (Zustand & React Query)

1. **Zustand (Client State):**
   * Use Zustand for global UI states, layout variables, sidebar states, and active local session data.
   * Avoid putting transactional database states or queries inside Zustand.
2. **React Query (Server State):**
   * Use TanStack Query for all asynchronous database requests, mutations, and cached endpoints.
   * Use custom React Query hooks to isolate API integrations from views:
     * **Example:** `export function useGoals() { return useQuery({ queryKey: ['goals'], queryFn: getGoals }); }`

---

## 🧹 Quality Gates & Hook Triggers

* **Code Formatting:** All code must pass Prettier check styles prior to pushing: `npm run format`.
* **Static Verification:** No ESLint errors or unhandled warnings allowed: `npm run lint`.
* **Commit Actions:** Git commits trigger Husky pre-commit hooks executing `lint-staged`. If files fail standard formats, the commit is aborted.
