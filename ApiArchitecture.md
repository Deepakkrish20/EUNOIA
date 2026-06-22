# EUNOIA OS API Architecture

This document describes the request/response pipelines, HTTP clients, caching layers, and backend handlers configured for **EUNOIA OS**.

---

## 🛰️ Architecture Overview

```
 [ React View ] ──► [ React Query Hook ] ──► [ Axios Client ] 
                                                   │ (JWT Header)
                                                   ▼
 [ Global Error ] ◄── [ Base Controller ] ◄── [ Express Router ]
                               │
                               ▼
 [ Base Repository ] ◄── [ Base Service ]
         │
         ▼
 [ PostgreSQL ]
```

---

## 💻 Frontend Client Layer

### 1. HTTP Request Engine (`axios-client.js`)
* **Endpoint Base:** Loaded dynamically via the env validator (`VITE_API_URL`).
* **Session Interceptor:** Integrates with auth hooks using a token resolver callback (`registerTokenResolver`). If a resolver is present, Axios requests dynamically fetch the active Clerk JWT session token and attach it as a `Authorization: Bearer <JWT>` header.
* **Response Transformer:** Extracts the inner data wrapper `response.data` to prevent components from referencing redundant Axios payloads, and intercepts runtime HTTP failures to format error messages.

### 2. Caching & State Query Engine (`query-client.js`)
* Implements **TanStack React Query v5** to cache data state.
* **Global Configuration:** Defaults queries to standard refresh parameters (5-minute TTL, single refetch attempt on network loss, disabled auto-refresh on window focus).

---

## ⚙️ Backend Reusable Core Architecture

To maximize scalability and prevent developer boilerplate duplication, EUNOIA OS enforces the **Controller -> Service -> Repository** pattern.

### 1. Database Access Layer (`BaseRepository`)
* **Purpose:** Generic database operations wrapper.
* **Design:** Leverages Prisma's model delegation patterns. A specific entity repository extends this class and passes the model's name (e.g. `super('task')`). 
* **Benefits:** Implements standard data operations (findMany, findUnique, findById, create, update, delete, count) without writing custom query logic for each feature module.

### 2. Logic Orchestration Layer (`BaseService`)
* **Purpose:** Acts as a broker for business validation rules.
* **Design:** Wraps repository actions. 
* **Benefits:** Encapsulates existence checks (e.g., throwing a standard 404 error if an ID lookup fails) and validates inputs before writing to the database repository.

### 3. Endpoint Presentation Layer (`BaseController`)
* **Purpose:** Manages Express controllers and HTTP response mappings.
* **JSON Envelope Mapper:** Extends `sendResponse()` to map payload outputs into standard envelopes:
  ```json
  {
    "data": { ... },
    "status": 200,
    "timestamp": "2026-06-22T15:49:13Z"
  }
  ```
* **Uncaught Exception Wrapper (`catchAsync`):** A helper function that wraps controller functions:
  ```js
  router.get('/list', this.catchAsync((req, res) => this.service.getAll()));
  ```
  This automatically forwards promise errors to the global error middleware without using manual `try-catch` blocks.

### 4. Input Validator Middleware (`validator.js`)
* Pre-checks input body data against requirement rules (like Joi/Zod formats) before forwarding request processing to service controllers.
