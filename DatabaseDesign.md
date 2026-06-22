# EUNOIA OS Database Design

This document details the relational schemas and index strategies implemented in PostgreSQL via the Prisma ORM for **EUNOIA OS**.

---

## 🗺️ Entity Relationship Layout

```
  ┌──────────────┐
  │     User     │◄──────┐
  │ (Clerk ID)   │       │
  └──────┬───────┘       │ 1:Many (Cascade)
         │               │
         ├─► Goal ◄──────┼─► Task
         │   (UUID)      │   (UUID)
         │               │
         ├─► Skill       ├─► Activity
         │   (UUID)      │   (UUID)
         │               │
         ├─► Roadmap     ├─► Analytics
         │   (UUID)      │   (UUID)
         │               │
         ├─► Resume      └─► LearningProgress
         │   (UUID)          (UUID)
         │
         └─► Simulation
             (UUID)
```

---

## 🗄️ Model Descriptions & Specifications

All model entities use auto-generated **UUID v4** strings as primary keys (`@default(uuid())`), with the exception of the `User` model, which uses the Clerk-provided User ID string to guarantee sync capabilities with authentication services.

### 1. User
* **Primary Key:** `id` (String matching Clerk identity token `user_...`)
* **Index:** Unique constraint on `email`, indexing `email` for search lookups.
* **Role Ready:** Incorporates `role` column (`USER` | `ADMIN` | `GUEST`).

### 2. Goal
* **Primary Key:** `id` (UUID v4)
* **Relations:** Belongs to `User` (1:Many, Cascade on delete). Has many `Task` elements.
* **Fields:** `title`, `description`, `status` (`TODO`, `IN_PROGRESS`, `COMPLETED`).

### 3. Task
* **Primary Key:** `id` (UUID v4)
* **Relations:** Belongs to `User` (1:Many, Cascade on delete). Optionally references `Goal` (SetNull on delete).
* **Fields:** `title`, `description`, `status` (`TODO`, `IN_PROGRESS`, `COMPLETED`).

### 4. Skill
* **Primary Key:** `id` (UUID v4)
* **Relations:** Belongs to `User` (1:Many, Cascade).
* **Fields:** `name`, `level` (`BEGINNER`, `INTERMEDIATE`, `EXPERT`).

### 5. Roadmap (AI Ready)
* **Primary Key:** `id` (UUID v4)
* **Relations:** Belongs to `User`.
* **AI Support:** Uses a `steps` `Json` field to hold a dynamic, generated tree of learning paths, course recommendations, and goals provided by the Gemini API.

### 6. Resume (AI Ready)
* **Primary Key:** `id` (UUID v4)
* **Relations:** Belongs to `User`.
* **AI Support:** Stores a structured `content` `Json` block representing parsed skills, career milestones, and projects extracted from raw resumes by the LLM parser.

### 7. Simulation (AI Ready)
* **Primary Key:** `id` (UUID v4)
* **Relations:** Belongs to `User`.
* **AI Support:** Stores a structured `transcript` `Json` array which holds the chat exchanges history of a simulation (e.g. mock interview, salary negotiation) between the user and the Gemini AI agent.

### 8. LearningProgress
* **Primary Key:** `id` (UUID v4)
* **Relations:** Belongs to `User`.
* **Fields:** `topic`, `percent` (Float progress metric), `completed` (Boolean flag).

### 9. Activity
* **Primary Key:** `id` (UUID v4)
* **Relations:** Belongs to `User`.
* **Fields:** `action` (event description string), `metadata` (`Json` event payload). Used to track user history logs.

### 10. Analytics
* **Primary Key:** `id` (UUID v4)
* **Relations:** Belongs to `User`.
* **Fields:** `metrics` (`Json` aggregate metrics).

---

## ⚡ Indexing & Optimization Strategy

1. **Foreign Key Indexing:**
   Each model has database index attributes (`@@index`) targeting the `userId` foreign key. This ensures fast lookups when fetching dashboard telemetry.
2. **Cascading Deletes:**
   Deleting a `User` automatically triggers database cascade cleanups across all child entities (Roadmaps, Resumes, Tasks, etc.), preventing orphaned records.
