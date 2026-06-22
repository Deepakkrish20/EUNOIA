# EUNOIA OS Frontend Design Specifications

This document defines the wireframe layouts, component structures, scroll animation maps, spacing scales, and responsive guidelines for the **EUNOIA OS** interface.

---

## 📐 1. Design Wireframes (Conceptual Layouts)

### A. Core Console Shell Layout (Desktop)
```
┌────────────────────────────────────────────────────────────────────────┐
│ [ EUNOIA OS Logo ]  │                                                  │
│ ─────────────────── │  [ Event Tracker ]       (User Avatar) [ Version ]│
│ - Dashboard         │  ──────────────────────────────────────────────  │
│ - Digital Twin      │                                                  │
│   - Resume Optimizer│                                                  │
│   - Learning Path   │  [ Hero Showcase Title ]                         │
│ - Vision OS         │  [ Storytelling Intro Subtext ]                  │
│ - Legacy System     │                                                  │
│ - Goals Board       │  ┌────────────────────┐ ┌─────────────────────┐  │
│ - Tasks Panel       │  │   Human Potential  │ │ AI Assistant Preview│  │
│ - Learning Hub      │  │        Score       │ │     Chat Input      │  │
│ - User Profile      │  └────────────────────┘ └─────────────────────┘  │
│ - Settings          │                                                  │
│                     │  [ Goals Overview ]                              │
│                     │  [ Learning Path Bars ]                          │
│                     │  [ Career Twin Summary ]                         │
│                     │  [ Future AI Projections ]                       │
│                     │  [ Recent Activity Feeds ]                       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🌳 2. Component Hierarchy Map

Below is the DOM nesting tree for the core application layout and the feature views:

```
App (main.jsx)
 └── AppProvider (ClerkProvider, QueryClientProvider)
      └── AppRouter (BrowserRouter, Routes, Route)
           ├── /auth -> SignInView (Login Cards)
           └── / -> DashboardLayout (Base Framework Layout)
                ├── Header Bar (System indicators, profile status)
                ├── Navigation Panel (Sidebar with links)
                └── Main Content Display (Outlet Container)
                     └── /dashboard -> DashboardView
                          ├── Hero Showcase Section (Entrance fades)
                          ├── Stats Grid Column
                          │    ├── Human Potential Score Card
                          │    └── AI Assistant Preview Card
                          ├── Goals Showcase (Milestone timelines)
                          ├── Learning Progress List (Progress meters)
                          ├── Career Twin Showcase (Calibration details)
                          ├── Vision Predictions List (Projections)
                          └── Activities Log (Table logger)
```

---

## 🎬 3. Motion & Animation Map (Framer Motion)

Animations use spring mechanics to create a premium feel.

| Transition Scope | Trigger Event | Animation Type | Physics Constants |
| :--- | :--- | :--- | :--- |
| **Page Entrance** | Route Navigation | Slide up & Fade in | `stiffness: 100, damping: 15, mass: 1` |
| **Sidebar Link Indicator** | Click / Link Hover | Layout ID Morph | `stiffness: 300, damping: 25, mass: 0.8` |
| **Grid Cards Entrance** | Page Boot | Stagger Reveal | `staggerChildren: 0.08` |
| **Interactive Hover** | Cursor Over Cards | Scale & Glow Lift | `scale: 1.01`, Glow Shadow opacity 0.15 -> 0.3 |
| **Loader Spinner** | Data Fetching | Infinite Spin | `ease: "linear", duration: 1.5, repeat: Infinity` |
| **Modal Overlays** | Action Click | Scale & Background Blur | Background opacity `0 -> 0.9`, zoom `0.95 -> 1` |

---

## 📏 4. Spacing System (Rhythmic Padding & Margins)

To maintain a clean, spacious look, we use a custom Tailwind spacing system based on a `4px` grid:

* **Grid Base (4px):** `0.25rem` -> `1` in Tailwind classes.
* **Micro Spacing (8px - 12px):** `py-2`, `gap-3`. Used for card headers and dropdown lists.
* **Component Padding (24px - 32px):** `p-6`, `p-8`. Used inside cards and main layouts.
* **Section Margins (32px - 48px):** `space-y-8`, `gap-10`. Used to separate different sections.
* **Layout Gaps (48px - 64px):** `py-12`, `px-16`. Used for overall page layout spacing.

---

## 📱 5. Responsive Strategy

Instead of stacking elements vertically on smaller screens, we adapt layouts for each screen size:

* **Desktop (`lg` / `xl` breakpoints):**
  * Split layouts (Sidebar occupies `w-68` on the left, Content canvas spans the remaining width).
  * Dashboard grid: 3-column stats display, side-by-side card layout.
* **Tablet (`md` breakpoint):**
  * Collapsible sidebar. The left sidebar collapses into an overlay menu, giving more room to the main canvas.
  * Dashboard grid: Adapts to a 2-column or single-column layout with larger margins.
* **Mobile (`sm` breakpoint):**
  * Bottom navigation or overlay drawer. The sidebar disappears, and a minimal bottom navigation bar controls core paths.
  * Spacious layouts: Content padding scales down (`p-8` -> `p-4`), and grids stack with standard vertical margins to prevent overflow.

---

## 🧠 6. Dashboard Storytelling Architecture

The dashboard is structured like a vertical product showcase rather than a traditional admin grid. The storytelling flow guides the user from high-level metrics to detailed reports:

1. **The Core Intro (Hero):** A cinematic welcome message presenting the user with their active AI agent status.
2. **The Blueprint (Potential Score & AI Chat):** Instantly displays their career alignment metrics side-by-side with an interactive AI chat preview.
3. **The Target (Goals Board):** Highlights their career milestones and short-term objectives.
4. **The Execution (Learning & Twin):** Details active learning progress metrics and career profile synchronization logs.
5. **The Projection (Vision Predictions):** Displays AI-generated predictions for industry and skill trends.
6. **The Audit Log (Activities):** Displays a telemetry logging history of recent events.
