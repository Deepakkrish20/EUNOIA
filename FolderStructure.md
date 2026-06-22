# Folder Structure

This file defines the directory tree and modular layout of **EUNOIA OS**.

```
eunoia-os/
├── .husky/                     # Pre-commit git hooks config
├── apps/                       # Applications
│   ├── web/                    # React + Vite frontend SPA
│   │   ├── src/
│   │   │   ├── app/            # Core shell architecture
│   │   │   │   ├── router/     # Page routing configuration
│   │   │   │   ├── providers/  # React context providers wrapper (Clerk, Query)
│   │   │   │   ├── layouts/    # Dashboard layout templates
│   │   │   │   ├── hooks/      # Global application hooks (e.g. useAuth)
│   │   │   │   └── store/      # Zustand state engines
│   │   │   ├── features/       # Feature-based system modules
│   │   │   │   ├── dashboard/  # Main analytics display panel
│   │   │   │   ├── twin/       # Digital Twin state and dashboard
│   │   │   │   ├── vision/     # Strategic vision board
│   │   │   │   ├── legacy/     # Legacy integration dashboard
│   │   │   │   ├── goals/      # Long/short-term goal planning
│   │   │   │   ├── tasks/      # Task list/Kanban boards
│   │   │   │   ├── learning/   # Adaptive learning engine hub
│   │   │   │   ├── assistant/  # AI helper interface
│   │   │   │   └── auth/       # Clerk auth views (sign-in, sign-up)
│   │   │   ├── components/     # UI components
│   │   │   │   ├── common/     # Global layout components
│   │   │   │   ├── ui/         # Design system elements re-export
│   │   │   │   └── animations/ # Framer-motion animation containers
│   │   │   ├── services/       # External service layers
│   │   │   │   ├── api/        # Axios API endpoint connectors
│   │   │   │   └── ai/         # Gemini chat connector
│   │   │   ├── lib/            # Shared local modules
│   │   │   │   ├── constants/  # Configurations
│   │   │   │   ├── helpers/    # Formatting functions
│   │   │   │   ├── validators/ # Form validations
│   │   │   │   └── utils/      # Aggregate utility exporters
│   │   │   ├── assets/         # Images, logo vectors
│   │   │   └── styles/         # Global styling directives (CSS)
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── tailwind.config.js
│   ├── server/                 # Express backend app
│   │   ├── src/
│   │   │   ├── core/           # Express system handlers
│   │   │   │   ├── middleware/ # Auth, rate limit, logging middlewares
│   │   │   │   ├── config/     # Server environment parameters
│   │   │   │   ├── database/   # Database connectors (Prisma)
│   │   │   │   ├── logger/     # Diagnostics logging wrapper
│   │   │   │   └── errors/     # Unified error middleware
│   │   │   ├── modules/        # Feature-based routes/services
│   │   │   │   ├── auth/       # Auth API paths
│   │   │   │   ├── users/      # User accounts API
│   │   │   │   ├── dashboard/  # Dashboard data calculations
│   │   │   │   ├── twin/       # Digital Twin state
│   │   │   │   ├── vision/     # Strategy management APIs
│   │   │   │   ├── legacy/     # Legacy database synchronization
│   │   │   │   ├── goals/      # Goals database operations
│   │   │   │   ├── tasks/      # Tasks/Kanban operations
│   │   │   │   ├── learning/   # Adaptive course APIs
│   │   │   │   ├── assistant/  # Gemini prompt controllers
│   │   │   │   └── analytics/  # Long-term usage analysis
│   │   │   ├── services/       # Integration connectors (Gemini SDK)
│   │   │   ├── routes/         # Central API route indexer
│   │   │   └── utils/          # Server utility aggregators
│   │   ├── prisma/             # Prisma schema migrations
│   │   └── package.json
│   └── docs/                   # Documentation website block
│       └── package.json
└── packages/                   # Monorepo Shared Libraries
    ├── ui/                     # Design primitives component library
    │   ├── src/
    │   │   └── index.js        # Design exports & class merge function
    │   └── package.json
    ├── utils/                  # JS helpers
    │   ├── src/
    │   │   └── index.js
    │   └── package.json
    ├── config/                 # Shareable lint/style configuration
    │   ├── eslint/             # ESLint config
    │   ├── tailwind/           # Tailwind preset configuration
    │   └── package.json
    └── shared/                 # Common parameters & types
        ├── src/
        │   └── index.js
        └── package.json
```
