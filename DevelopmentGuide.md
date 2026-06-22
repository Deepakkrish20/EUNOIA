# EUNOIA OS Development Guide

This guide is an engineering playbook for expanding the features, database models, and AI integrations of **EUNOIA OS**.

---

## 🛠️ Adding a New Feature Module (Frontend)

To build a new feature (e.g. `career-simulator`), follow this step-by-step process:

1. **Scaffold Folder Structure:**
   Create a new folder under `apps/web/src/features/career-simulator/`:
   ```
   features/career-simulator/
   ├── components/       # Feature-specific components
   ├── hooks/            # API integration queries
   ├── store/            # Local Zustand state (if needed)
   ├── index.js          # Main public API export file
   └── CareerSimView.jsx # Core page layout
   ```

2. **Define Public Exports:**
   Expose only the necessary entrypoints inside `index.js`:
   ```javascript
   export { CareerSimView } from './CareerSimView';
   ```

3. **Map the Routing:**
   Open `apps/web/src/app/router/AppRouter.jsx` and import the new view from the feature:
   ```javascript
   import { CareerSimView } from '@/features/career-simulator';
   // ...
   <Route path="simulator" element={<CareerSimView />} />
   ```

4. **Add Navigation Links:**
   Open `apps/web/src/app/layouts/DashboardLayout.jsx` and add the route path details:
   ```javascript
   { name: 'Career Simulator', path: '/simulator' }
   ```

---

## 🗄️ Adding a New Database Model (Backend)

To expand the PostgreSQL database schema:

1. **Update Schema Model:**
   Open `apps/server/prisma/schema.prisma` and define the database table:
   ```prisma
   model SimulationResult {
     id        String   @id @default(uuid())
     score     Int
     userId    String
     user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   ```

2. **Generate Prisma Client:**
   Run the Prisma generate script in your workspace terminal:
   ```bash
   npm run prisma:generate --workspace=apps/server
   ```

3. **Implement Repository & Logic Layers:**
   Create a new repository extending `BaseRepository` in `apps/server/src/modules/simulation/simulation.repository.js`:
   ```javascript
   import { BaseRepository } from '../../core/database/base.repository.js';
   export class SimulationRepository extends BaseRepository {
     constructor() {
       super('simulationResult');
     }
   }
   ```
   Create the corresponding service extending `BaseService` to encapsulate validations and business rules.

4. **Expose Controllers & Routes:**
   Create a controller extending `BaseController` and map standard routes. Register the router within `apps/server/src/routes/index.js` to expose it under `/api`.

---

## 🤖 Orchestrating AI Prompts (Gemini API)

EUNOIA OS routes AI operations through the central service layer.

1. **Accessing the AI Client:**
   Import `geminiService` from the services workspace inside backend routers:
   ```javascript
   import { geminiService } from '../../services/index.js';
   ```

2. **Orchestrating Queries:**
   Call `generateText()` inside async controllers wrapped in `catchAsync`:
   ```javascript
   const result = await geminiService.generateText(userPrompt);
   ```

3. **Guidelines for Prompts:**
   * Keep prompts structured (instructing the model to return JSON outputs where possible).
   * Maintain zero logic inside the Prompt layers; always parse outputs using validation schemas.
