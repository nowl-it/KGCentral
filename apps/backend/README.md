# @kgcentral/backend

REST API server của KGCentral, xây dựng bằng **NestJS 11**.

> **⚠️ Security Warning:** Backend has critical security issues - no authentication guards implemented. All endpoints are publicly accessible.
> 
> **📊 Implementation Status:** ~20% complete (Basic auth + user CRUD working, but unprotected. No wiki/team/forum modules yet.)

## Tech Stack

- **NestJS 11.0.8** - Framework
- **Prisma ORM** - Database ORM (qua `@kgcentral/database`)
- **PostgreSQL 17** - Database
- **JWT (jsonwebtoken 9.0.2)** - Authentication tokens
- **bcrypt 6.0.1** - Password hashing
- **Zod 3.25.76** - Request validation
- **i18next 24.0.0** - Đa ngôn ngữ (qua `@kgcentral/i18n`)
- **tsx** - Dev server với hot reload

## API Endpoints Implemented

### ✅ Working Endpoints (5 total)

#### Root & Health

| Method | Endpoint | Response | Status |
|--------|----------|----------|--------|
| `GET` | `/api/v1/` | `{ message: "KGCentral API v1", version: "1.0.0" }` | ✅ Working |
| `GET` | `/api/v1/health` | `{ status: "ok", timestamp: ISO }` | ✅ Working |

#### Auth Module

| Method | Endpoint | Body | Response | Status |
|--------|----------|------|----------|--------|
| `POST` | `/api/v1/auth/login` | `{ email, password }` | `{ token, user }` | ✅ Working |
| `POST` | `/api/v1/auth/register` | `{ email, password, username, name? }` | `{ user }` | ✅ Working |

**Features:**
- ✅ JWT token generation (7-day expiry)
- ✅ bcrypt password hashing (10 salt rounds)
- ✅ Email/username uniqueness checks
- ✅ Zod validation (email format, password min 6 chars)
- ❌ **NO password strength requirements** (min 6 chars only)
- ❌ **NO rate limiting** (vulnerable to brute force)

**Login Response Example:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clxxx...",
    "email": "user@example.com",
    "username": "username",
    "name": "Display Name",
    "avatar": null,
    "role": "USER",
    "locale": "vi",
    "createdAt": "2026-03-28T00:00:00.000Z",
    "updatedAt": "2026-03-28T00:00:00.000Z"
  }
}
```

#### Users Module

| Method | Endpoint | Description | Status | Protection |
|--------|----------|-------------|--------|------------|
| `GET` | `/api/v1/users` | List all users (excludes password) | ✅ Working | 🔴 **UNPROTECTED** |
| `GET` | `/api/v1/users/:id` | Get user by CUID | ✅ Working | 🔴 **UNPROTECTED** |

**🔴 CRITICAL ISSUE:** Users endpoints have **NO authentication guards**. Anyone can list all users and access user details without login!

**Response Example:**
```json
{
  "users": [
    {
      "id": "clxxx...",
      "email": "user@example.com",
      "username": "username",
      "name": "Display Name",
      "avatar": null,
      "role": "USER",
      "locale": "vi"
    }
  ]
}
```

### 🔲 Not Yet Implemented

- **Wiki Module** - Heroes, Equipment, Altars, Relics CRUD
- **Team Module** - Team builder CRUD, share, community gallery
- **Recommendation Service** - Synergy scoring algorithm
- **Tier List Module** - Voting, Wilson Score ranking
- **Forum Module** - Categories, threads, replies
- **Search Service** - PostgreSQL full-text search
- **File Upload** - Image/asset upload service
- **Admin Module** - Admin dashboard, moderation

## Cấu Trúc

```
src/
├── main.ts                    # Bootstrap NestJS (138 lines)
│                              # - Sets API prefix to /api/v{major}
│                              # - Configures CORS
│                              # - No global guards/filters/interceptors
└── app/
    ├── app.module.ts           # Root module (imports Auth, Users)
    ├── app.controller.ts       # Root & health endpoints (28 lines)
    ├── auth/
    │   └── auth.controller.ts  # Login & register (84 lines)
    │                           # - Uses Prisma directly (no service layer)
    │                           # - JWT generation
    │                           # - bcrypt hashing
    └── users/
        └── users.controller.ts # User CRUD (51 lines)
                                # - Uses Prisma directly (no service layer)
                                # - NO authentication guards
```

**Total Backend Code:** ~246 LOC

**🔴 Architecture Issues:**
- No service layer (anti-pattern - all logic in controllers)
- No guards (JwtAuthGuard, RolesGuard)
- No global exception filters
- No logging middleware
- No request/response interceptors

## Cấu Hình

```env
# apps/backend/.env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/kgcentral
JWT_SECRET=change-this-secret-in-production  # ⚠️ CHANGE THIS!
CORS_ORIGINS=http://localhost:3000
```

**⚠️ Security Notes:**
- `JWT_SECRET` MUST be changed to a strong random key (use `openssl rand -base64 64`)
- `DATABASE_URL` contains password in plaintext - use environment variables
- Default postgres password is weak

## Chạy Development

```bash
# Từ root project
pnpm --filter @kgcentral/backend dev

# Hoặc từ thư mục backend
pnpm dev
```

Server chạy tại [http://localhost:4000](http://localhost:4000).

## API Reference

Tất cả endpoints có prefix `/api/v1/`.

> ⚠️ **Security Alert:** All user endpoints are currently UNPROTECTED. No JWT verification is performed.

### Root

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| `GET` | `/api/v1/` | Thông tin API & version |
| `GET` | `/api/v1/health` | Health check |

### Auth

| Method | Endpoint | Body | Mô tả |
|--------|----------|------|--------|
| `POST` | `/api/v1/auth/login` | `{ email, password }` | Đăng nhập (returns JWT) |
| `POST` | `/api/v1/auth/register` | `{ email, password, username, name? }` | Đăng ký (no token returned) |

**Validation (Zod):**
- `email`: email hợp lệ
- `password`: tối thiểu 6 ký tự ⚠️ (should be 12+)
- `username`: 3-30 ký tự (bắt buộc)
- `name`: tối thiểu 1 ký tự (tùy chọn)

**Error Responses:**
- `400` - Validation error (Zod)
- `401` - Invalid credentials (login)
- `409` - Email/username already exists (register)

### Users

| Method | Endpoint | Mô tả | Protection |
|--------|----------|--------|------------|
| `GET` | `/api/v1/users` | Danh sách users (excludes password) | 🔴 None |
| `GET` | `/api/v1/users/:id` | Chi tiết user theo CUID | 🔴 None |

**🔴 TODO:** Add `@UseGuards(JwtAuthGuard)` to protect these endpoints!

## Database Schema

**Status:** Only **User** model implemented (via `@kgcentral/database`)

### User Model

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  name      String?
  avatar    String?
  password  String              // bcrypt hashed
  role      Role     @default(USER)
  locale    String   @default("vi")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("users")
}

enum Role {
  ADMIN
  MOD
  USER
}
```

### 🔲 Missing Models (Planned)

- Hero - Character database
- Equipment - Items database
- Altar - Altar configurations
- Relic - Relic effects
- TeamBuild - Saved team compositions
- TeamHero - Team-Hero relations
- Synergy - Synergy scores
- TierVote - Tier list votes
- ForumCategory, ForumThread, ForumReply

## Shared Packages

| Package | Usage | Imports |
|---------|-------|---------|
| `@kgcentral/config` | App config | `appConfig.version`, `appConfig.apiPrefix` |
| `@kgcentral/database` | Prisma ORM | `prisma` singleton |
| `@kgcentral/i18n` | Internationalization | (imported but not used) |
| `@kgcentral/types` | TypeScript types | `ApiResponse`, `User`, `Role` |

## Critical Security Issues

1. **🔴 No JWT Authentication Guards** - All endpoints unprotected
2. **🔴 Weak Password Policy** - Only 6 character minimum
3. **🔴 No Rate Limiting** - Vulnerable to brute force
4. **🔴 No Input Sanitization** - Beyond basic Zod validation
5. **🔴 No Error Handling** - No global exception filters
6. **🔴 No Logging** - No request/response logging
7. **🔴 Direct Prisma in Controllers** - No service layer (anti-pattern)

## Next Steps

1. **Implement JWT Guards** - Create `JwtAuthGuard` and protect endpoints
2. **Add Service Layer** - Extract business logic from controllers
3. **Strengthen Password Policy** - Min 12 chars, complexity requirements
4. **Add Rate Limiting** - @nestjs/throttler (5 attempts/min for login)
5. **Global Exception Filter** - Consistent error responses
6. **Request Logging** - Winston logger + middleware
7. **Implement Wiki Modules** - Heroes, Equipment, Altars, Relics
8. **Implement Team Module** - Team builder CRUD
9. **Recommendation Service** - Synergy scoring algorithm

## Build

```bash
pnpm --filter @kgcentral/backend build
```

Output: `dist/`
