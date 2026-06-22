# EUNOIA OS Design System & Visual Guidelines

This document specifies the color metrics, typographic hierarchies, depth layers, shadow structures, and motion physics established to style **EUNOIA OS** as a luxury AI operating system.

---

## 🎨 Color System

```
  ┌─────────────────────────────────────────────────────────┐
  │  Pure Black  │  Secondary Surface  │  Elevated Surface  │
  │   #000000    │       #080808       │      #101010       │
  └─────────────────────────────────────────────────────────┘
  ┌─────────────────────────────────────────────────────────┐
  │ Periwinkle   │  Secondary Accent   │    Glow Accent     │
  │   #8898E7    │       #4D66E5       │      #A3B0F0       │
  └─────────────────────────────────────────────────────────┘
```

### Color Codes Table

| Token | Hex Code | HSL Equivalent | Role |
| :--- | :--- | :--- | :--- |
| **Pure Black** | `#000000` | `0 0% 0%` | Primary background canvas |
| **Secondary Surface** | `#080808` | `0 0% 3%` | Sidebar, navigation base |
| **Elevated Surface** | `#101010` | `0 0% 6%` | Modals, dialog dialogs |
| **Card Surface** | `#0A0A0A` | `0 0% 4%` | UI metrics panels and grid cards |
| **Primary Accent** | `#8898E7` | `230 66% 72%` | Periwinkle blue highlights, primary buttons |
| **Secondary Accent** | `#4D66E5` | `230 76% 60%` | Subtle hover borders and accents |
| **Glow Accent** | `#A3B0F0` | `230 70% 79%` | Backlighting box shadows |
| **Primary Text** | `#FFFFFF` | `0 0% 100%` | Headings, high-contrast text |
| **Secondary Text** | `#B0B0B0` | `0 0% 69%` | Main body copy |
| **Muted Text** | `#6B6B6B` | `0 0% 42%` | Meta descriptions, subtext |
| **Success** | `#00FFB2` | `162 100% 50%` | Active statuses, indicators |
| **Warning** | `#FFB800` | `43 100% 50%` | System alerts |
| **Error** | `#FF4D4D` | `0 100% 65%` | Critical warnings, delete buttons |

---

## ✍️ Typography & Hierarchies

We use the **Outfit** sans-serif font family to deliver a confident and minimal layout, paired with **Share Tech Mono** for technical metadata and counts.

* **Large Headlines:**
  * *Size:* `72px–120px` (or `font-extrabold text-7xl tracking-tighter`)
  * *Usage:* Hero landing pages, welcome greetings.
* **Dashboard Titles:**
  * *Size:* `32px–48px` (or `font-mono text-3xl tracking-tight`)
  * *Usage:* Active module header.
* **Section Headers:**
  * *Size:* `20px–24px`
  * *Usage:* Card titles, group configurations.
* **Body Copy:**
  * *Size:* `16px–18px`
  * *Usage:* Analytics details, lists, transcripts.
* **Muted Copy:**
  * *Size:* `12px–14px`
  * *Usage:* Timestamps, labels.

---

## 🪟 Depth, Border Glows & Layers

1. **Layer Structure:**
   * Canvas base: `#000000` (Pure Black).
   * Elevated layer: `#080808` with a 1px border of `rgba(136, 152, 231, 0.1)`.
   * Floating elements: `#0A0A0A` with a 1px border of `rgba(136, 152, 231, 0.15)`.
2. **Glow Shadows:**
   Use thin shadows with a subtle blue glow to outline cards on hover:
   `box-shadow: 0 0 35px -5px rgba(136, 152, 231, 0.15);`
3. **Translucent Glass Panels:**
   * Backing filter: `backdrop-filter: blur(20px) saturate(180%);`
   * Glass background: `background: rgba(4, 4, 4, 0.85);`

---

## 🎬 Motion System (Framer Motion Guidelines)

Animations should feel smooth and intentional.

* **Spring Physics Constants:**
  * Stiff components (Buttons, active highlights): `stiffness: 300, damping: 25, mass: 0.8`
  * Soft overlays (Modal entrances): `stiffness: 100, damping: 15, mass: 1`
* **Entrance Fades:**
  Use staggers to render lists sequentially:
  ```javascript
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }
  ```
* **Page Transitions:**
  Wrap page route elements in `AnimatePresence` to enable slide-fade transitions when navigating.
