# @kgcentral/backend

REST API server của KGCentral, xây dựng bằng **NestJS 11**.

## Tech Stack

- **NestJS 11** - Framework
- **Prisma** - ORM (qua `@kgcentral/database`)
- **Zod** - Request validation
- **i18next** - Đa ngôn ngữ (qua `@kgcentral/i18n`)
- **tsx** - Dev server với hot reload

## Cấu Trúc

```
src/
├── main.ts                    # Bootstrap NestJS, set API prefix
└── app/
    ├── app.module.ts           # Root module
    ├── app.controller.ts       # Root & health endpoints
    ├── auth/
    │   └── auth.controller.ts  # Login & register
    └── users/
        └── users.controller.ts # User CRUD
```

## Cấu Hình

```env
# apps/backend/.env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/kgcentral
CORS_ORIGINS=http://localhost:3000
```

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

### Root

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| `GET` | `/api/v1/` | Thông tin API & version |
| `GET` | `/api/v1/health` | Health check |

### Auth

| Method | Endpoint | Body | Mô tả |
|--------|----------|------|--------|
| `POST` | `/api/v1/auth/login` | `{ email, password }` | Đăng nhập |
| `POST` | `/api/v1/auth/register` | `{ email, password, name }` | Đăng ký |

**Validation (Zod):**
- `email`: email hợp lệ
- `password`: tối thiểu 6 ký tự
- `name`: tối thiểu 1 ký tự (chỉ register)

### Users

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| `GET` | `/api/v1/users` | Danh sách users |
| `GET` | `/api/v1/users/:id` | Chi tiết user theo ID |

## Shared Packages

| Package | Mục đích |
|---------|----------|
| `@kgcentral/config` | App name, version, API prefix, locales |
| `@kgcentral/database` | Prisma client (singleton) |
| `@kgcentral/i18n` | i18next instance |
| `@kgcentral/types` | Shared TypeScript types |

## Build

```bash
pnpm --filter @kgcentral/backend build
```

Output: `dist/`
