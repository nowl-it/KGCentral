# KGCentral - Copilot Instructions

**King God Castle Community Platform** - A monorepo featuring a Next.js frontend, NestJS backend, and FastAPI AI service for the King God Castle game community.

## Build, Test, and Lint Commands

### Monorepo-wide

```bash
# Development - runs all apps simultaneously
pnpm dev

# Build all packages and apps
pnpm build

# Lint all code (Biome for JS/TS)
pnpm lint

# Clean build artifacts
pnpm clean
```

### Frontend (`apps/frontend`)

```bash
# Development server (:3000)
pnpm --filter @kgcentral/frontend dev

# Production build
pnpm --filter @kgcentral/frontend build

# Type checking
pnpm --filter @kgcentral/frontend typecheck

# Lint
pnpm --filter @kgcentral/frontend lint
```

### Backend (`apps/backend`)

```bash
# Development server with hot reload (:4000)
pnpm --filter @kgcentral/backend dev

# Build TypeScript to dist/
pnpm --filter @kgcentral/backend build

# Type checking
pnpm --filter @kgcentral/backend typecheck

# Lint
pnpm --filter @kgcentral/backend lint
```

### AI Service (`apps/ai-service`)

Python project using `pyproject.toml` and `ruff` for linting.

```bash
# Setup Ollama (for AI Chat)
ollama pull qwen2.5:3b  # Lightweight, RPi4 compatible

# Development server (:5000)
cd apps/ai-service
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn httpx torch pydantic-settings
uvicorn src.main:app --reload --host 0.0.0.0 --port 5000

# Lint Python code
ruff check .

# Format Python code
ruff format .
```

### Database (`packages/database`)

```bash
# Generate Prisma client (required after schema changes)
pnpm --filter @kgcentral/database db:generate

# Push schema to database (dev)
pnpm --filter @kgcentral/database db:push

# Create migration
pnpm --filter @kgcentral/database db:migrate

# Open Prisma Studio
pnpm --filter @kgcentral/database db:studio
```

## Architecture Overview

### Monorepo Structure

This is a **pnpm workspaces + Turborepo** monorepo with three main apps and five shared packages:

```
apps/
├── frontend/      - Next.js 16, React 19 (:3000)
├── backend/       - NestJS 11 REST API (:4000)
└── ai-service/    - FastAPI + PyTorch + Ollama AI (:5000)

packages/
├── config/        - Shared app configuration
├── database/      - Prisma ORM + PostgreSQL schema
├── i18n/          - Internationalization (vi/en)
├── types/         - Shared TypeScript types
└── ui/            - Design system (shadcn/ui + Tailwind v4)
```

### Key Architectural Patterns

**Workspace Dependencies**: Internal packages are referenced as `workspace:*` in package.json. Changes to packages are automatically reflected in consuming apps during development.

**API Versioning**: Backend uses global prefix `/api/v{major}` (e.g., `/api/v1`). The version is extracted from `appConfig.version` and only the major version is used.

**CORS Configuration**: Both backend (NestJS) and AI service (FastAPI) read `CORS_ORIGINS` from environment variables (comma-separated list).

**Shared Config Package**: `@kgcentral/config` exports `appConfig` used across all TypeScript apps for consistency (API prefix, version, CORS origins).

**i18n Strategy**:
- Default locale: `vi` (Vietnamese)
- Supported: `vi`, `en`
- Translation files: `packages/i18n/src/locales/{locale}/`
- Both frontend (react-i18next) and backend/AI service (i18next) share the same translation structure

**Database Access**: 
- Only the backend consumes `@kgcentral/database`
- AI service does not use the database directly
- Prisma client is generated at `packages/database/node_modules/.prisma/client`

**UI Components**:
- Built with shadcn/ui and Radix UI primitives
- Tailwind CSS v4 for styling
- Icons: Lucide React and HugeIcons
- Exported from `@kgcentral/ui` for use in frontend

## Key Conventions

### Code Style (Biome)

All JavaScript/TypeScript code uses **Biome** for linting and formatting:

- **Indentation**: Tabs (width: 4)
- **Line width**: 100 characters
- **Quotes**: Single quotes
- **Semicolons**: Always
- **Trailing commas**: ES5 style
- **Import organization**: Auto-organize on save
- **Type imports**: Use `type` keyword inline (e.g., `import { type User }`)

### Python Code Style (Ruff)

- **Target version**: Python 3.12+
- Use Ruff for both linting and formatting

### NestJS Backend Structure

```
apps/backend/src/
├── main.ts              - Bootstrap file
└── app/
    ├── app.module.ts    - Root module
    ├── app.controller.ts
    ├── auth/            - Auth module (JWT, bcrypt)
    │   └── auth.controller.ts
    └── users/           - Users module
        └── users.controller.ts
```

**Controllers**: Use NestJS decorators (`@Controller`, `@Get`, `@Post`)
**Dependencies**: Inject services via constructor DI
**Global prefix**: Set in `main.ts` as `/api/v{major}`

> **⚠️ Security Warning:**
> - No JWT authentication guards implemented - all endpoints are UNPROTECTED
> - No service layer - all logic in controllers (anti-pattern)
> - Only User model in database (Hero, Equipment, Altar, Relic models not yet defined)

### FastAPI AI Service Structure

```
apps/ai-service/src/
├── main.py              - FastAPI app initialization
├── config.py            - Settings via Pydantic
├── i18n.py              - i18next initialization
└── routes/
    ├── health.py        - Health check
    ├── inference.py     - AI inference endpoints
    └── models.py        - Model management
```

**Routers**: Use FastAPI's `APIRouter` with prefixes in `main.py`
**Lifespan**: i18n initialization happens in lifespan context manager
**Settings**: Use Pydantic Settings for environment variables

> **⚠️ AI Service Status:**
> - ✅ AI Chat with Qwen2.5:3b (Ollama) - working
> - ✅ Game Data API (heroes, relics) - working
> - ✅ Team Synergy Calculator - working  
> - ✅ PyTorch neural networks defined
> - 🔲 Model training with real data - planned

### Next.js Frontend Structure

```
apps/frontend/src/
├── app/                 - Next.js App Router
│   ├── layout.tsx       - Root layout
│   └── page.tsx         - Home page
├── components/          - React components
└── lib/                 - Utilities
```

**Routing**: Uses Next.js 16 App Router (file-based)
**Styling**: Tailwind CSS v4 with `@kgcentral/ui` components
**i18n**: react-i18next for client-side translations

> **⚠️ Implementation Status:**
> - ✅ Landing page, navigation, i18n, theme switching (30% complete)
> - ✅ AI Chat page (`/chat`) - working
> - 🔲 Wiki pages, Team Builder, AI Recommendations not yet built (0%)

### Prisma Schema Conventions

- **IDs**: Use `cuid()` for primary keys (String type)
- **Timestamps**: Include `createdAt` and `updatedAt` on models
- **Naming**: Use `@@map` to specify snake_case table names
- **Enums**: Define TypeScript-style enums in schema

> **⚠️ Database Status:** Only **User** model implemented (~5% complete). Hero, Equipment, Altar, Relic, TeamBuild, Synergy models not yet defined.

### Environment Variables

Each app has its own `.env.example` file:
- Root: Shared variables
- `apps/frontend/.env.example`: Next.js variables
- `apps/backend/.env.example`: NestJS variables (DATABASE_URL, JWT_SECRET)
- `apps/ai-service/.env.example`: FastAPI variables

### Docker & Deployment

```bash
# Docker Compose (development)
pnpm docker:up        # Start all services
pnpm docker:down      # Stop all services

# Kubernetes / K3s
pnpm k3s:deploy       # Deploy to dev environment
pnpm k3s:undeploy     # Remove from dev environment
```

**Docker files**: Located in `devops/docker/`
**Kubernetes manifests**: Located in `devops/k8s/` (Kustomize overlays: dev/prod)

## Technology Versions

- **Node.js**: >= 22.0.0
- **pnpm**: >= 9.0.0  
- **Python**: >= 3.12
- **PostgreSQL**: 17
- **Next.js**: 16 (16.2.1)
- **React**: 19 (19.2.4)
- **NestJS**: 11 (11.0.8)
- **Tailwind CSS**: 4.2 (4.2.2)
- **FastAPI**: 0.115.12
- **PyTorch**: 2.6.0
- **Ollama**: Qwen2.5:3b (for AI Chat)

## Implementation Status Summary

### ✅ Completed
- Frontend infrastructure (landing page, navigation, i18n, theme)
- **AI Chat** - Chat UI + Qwen2.5:3b backend
- **Game Data API** - Heroes, relics from JSON files
- **Team Synergy Calculator** - 4-factor scoring system
- Backend basic auth (login/register with JWT)
- All 5 shared packages (config, database, i18n, types, ui)
- DevOps configs (Docker, K8s)

### 🔴 Critical Issues
- No JWT authentication guards (endpoints unprotected)
- Hardcoded secrets in Docker/K8s configs
- Only User model in database (5% of schema)

### 🔲 Not Yet Implemented
- Wiki pages (Heroes, Equipment, Altars, Relics) - 0%
- Team Builder UI and backend - 0%
- Neural network training with real data - 0%
- Tier List voting - 0%
- Forum/Community features - 0%

## Important Notes

- **Always run `db:generate` after modifying Prisma schema** before building or running apps
- **Use Turborepo task dependencies**: Building depends on `^build` (build dependencies first)
- **Vietnamese is the primary language**: Default locale is `vi`, fallback to `en`
- **This is a fan project**: Not affiliated with or endorsed by the game developer (Awesomepiece)
