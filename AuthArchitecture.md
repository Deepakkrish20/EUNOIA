# EUNOIA OS Authentication & Authorization Architecture

This document describes how user identities, JWT sessions, route authorization, and role guards are integrated into **EUNOIA OS** using Clerk.

---

## 🔒 Session Verification & Claims

```
 [ Incoming Request ]
          │
          ▼
 [ ClerkAuthMiddleware ] ──(No Token)──► Assign req.auth = { userId: null, role: GUEST }
          │
      (Has JWT)
          ▼
 [ Decode JWT & Verify ] ──────────────► Assign req.auth = { userId, role }
          │
          ├──► Public Path? (e.g. /health, /auth) ────► Pass to Route Handler
          │
          └──► Protected Path? 
                    │
                    ▼
          [ requireAuth Guard ]
                    │
                    ▼
          [ requireRole Guard ] ────────► Pass to Route Handler
```

---

## 🛠️ Authentication Extractor Middleware

Authentication is verified globally at the router level by **`ClerkAuthMiddleware`**.

### 1. Token Decoding
* The middleware extracts the authorization bearer token from incoming headers: `Authorization: Bearer <JWT>`.
* In production, the token is verified using Clerk's JSON Web Key Set (JWKS) via the `@clerk/clerk-sdk-node` library.
* The extracted context (Clerk User ID and authorization role) is mounted to the Express request instance as `req.auth = { userId, role }`.
* If the token is missing or invalid, the request is flagged as a anonymous user context: `req.auth = { userId: null, role: 'GUEST' }`.

---

## 🚦 Route Access Levels

We enforce route access levels by distinguishing between public and protected endpoints.

### 1. Public Endpoints
* **Description:** Open access routes that bypass authorization requirements.
* **Paths:**
  * System health check: `/health`
  * Clerk webhook handlers or standard public landing pages.
  * Clerk session endpoints (e.g. initial token exchanges).

### 2. Protected Endpoints (`requireAuth`)
* **Description:** Restricts access to requests containing valid Clerk user identities.
* **Action:** If `req.auth.userId` is missing, the request returns a `401 Unauthorized` response, preventing it from reaching route handlers.

---

## 👥 Role-Based Access Control (RBAC)

EUNOIA OS features a **role-ready design** mapping user roles to authorization levels.

### 1. System Roles
* **`ADMIN`**: Read/write access to system settings, databases, logs, and billing.
* **`USER`**: Standard account access to create tasks, roadmaps, goals, and chat with the AI assistant.
* **`GUEST`**: Read-only access to landing pages and select public data modules.

### 2. Role Guards (`requireRole`)
* We implement role-based security using the `requireRole(allowedRoles)` decorator.
* The middleware verifies the user's role:
  ```js
  router.use('/analytics', requireAuth, requireRole([ROLES.ADMIN]), analyticsRouter);
  ```
* If the user's role is not in the allowed list, the middleware returns a `403 Forbidden` response and logs the access attempt.
