# EUNOIA OS Feature Roadmap

This document outlines the development lifecycle phases for building out the features of **EUNOIA OS**.

---

## 🗺️ Execution Milestones

```
 ┌───────────────────────────────────────────────┐
 │  Phase 1: Foundation (Scaffolding Configs)    │ (Completed)
 └──────────────────────┬────────────────────────┘
                        ▼
 ┌───────────────────────────────────────────────┐
 │  Phase 2: Dashboard (Metrics telemetry logs)  │
 └──────────────────────┬────────────────────────┘
                        ▼
 ┌───────────────────────────────────────────────┐
 │  Phase 3: EUNOIA Twin (Resume/Career paths)   │
 └──────────────────────┬────────────────────────┘
                        ▼
 ┌───────────────────────────────────────────────┐
 │  Phase 4: EUNOIA Vision (Strategy boards)    │
 └──────────────────────┬────────────────────────┘
                        ▼
 ┌───────────────────────────────────────────────┐
 │  Phase 5: EUNOIA Legacy (Sync connector DB)   │
 └──────────────────────┬────────────────────────┘
                        ▼
 ┌───────────────────────────────────────────────┐
 │  Phase 6: AI Features (Gemini simulator chats)│
 └──────────────────────┬────────────────────────┘
                        ▼
 ┌───────────────────────────────────────────────┐
 │  Phase 7: Scaling (Cache levels, replication) │
 └───────────────────────────────────────────────┘
```

---

## 📅 Roadmap Details

### Phase 1: Foundation (Status: Complete)
* **Goal:** Scaffolding standard environments, configurations, and core patterns.
* **Deliverables:**
  * Native npm workspaces setup.
  * Clerk auth guards and RBAC role validations.
  * Reusable database BaseRepository, BaseService, and base JSON response controller stubs.
  * Shared styles, atomic components UI library, and Zustand stores.

### Phase 2: Dashboard
* **Goal:** Implement the main visual telemetry dashboard interface.
* **Deliverables:**
  * Real-time metrics calculations (Activity logs counts, completed task ratios).
  * System event logging backend services.
  * Telemetry graph widgets utilizing Recharts and Zustand dashboard states.

### Phase 3: EUNOIA Twin
* **Goal:** Develop the core data synchronization and career profiling engine.
* **Deliverables:**
  * File upload parsers for resumes.
  * Career roadmap milestone viewer components.
  * Skill matrix profiles and visual skill radar charts.

### Phase 4: EUNOIA Vision
* **Goal:** Implement the strategic management system.
* **Deliverables:**
  * Strategic goal planners (Short/long-term tags).
  * Interactive Kanban boards with drag-and-drop task state transitions.
  * Connecting tasks to parent goals to track overall progress.

### Phase 5: EUNOIA Legacy
* **Goal:** Bridge the gap with older systems.
* **Deliverables:**
  * Read/write sync connectors to external databases.
  * Automated data transfer logging and telemetry logs.
  * Legacy system migration utilities.

### Phase 6: AI Features
* **Goal:** Integrate Gemini LLM cognitive capabilities.
* **Deliverables:**
  * Automated resume parsing using structured schema prompts.
  * AI-generated learning roadmaps with course recommendations.
  * Interactive simulation chat screens (Mock job interviews, salary negotiations) with real-time score feedback.

### Phase 7: Scaling
* **Goal:** Optimize for high-load production environments.
* **Deliverables:**
  * Redis query caching for analytical reports.
  * Database read-replica routing configurations.
  * API rate limiting and DDoS protection middleware wrappers.
