# KGCentral

**King God Castle Community Platform** - Website cộng đồng cho game King God Castle với Wiki, Team Builder và hệ thống đề xuất đội hình AI.

## Tính Năng Chính

- **Wiki** - Tra cứu thông tin tướng, trang bị, altar, relic
- **Team Builder** - Xây dựng đội hình với drag-and-drop
- **AI Recommendations** - Đề xuất đội hình tự động dựa trên Synergy Scoring
- **Tier List** - Xếp hạng tướng với Wilson Score voting
- **Đa ngôn ngữ** - Hỗ trợ Tiếng Việt và English

## Kiến Trúc

```
KGCentral/
├── apps/
│   ├── frontend/        # Next.js 15 - Giao diện web (:3000)
│   ├── backend/         # NestJS 11 - REST API (:4000)
│   └── ai-service/      # FastAPI + PyTorch - AI inference (:5000)
├── packages/
│   ├── config/          # Cấu hình dùng chung
│   ├── database/        # Prisma ORM + PostgreSQL
│   ├── i18n/            # Đa ngôn ngữ (vi/en)
│   ├── types/           # TypeScript types dùng chung
│   └── ui/              # Design system (shadcn/ui + Tailwind v4)
└── devops/
    ├── docker/          # Dockerfiles
    └── k8s/             # Kubernetes manifests (Kustomize)
```

## Tech Stack

| Layer | Công nghệ |
|-------|-----------|
| Monorepo | pnpm workspaces + Turborepo |
| Frontend | Next.js 15, React 19, Tailwind CSS v4, shadcn/ui |
| Backend | NestJS 11, Zod, JWT, bcrypt |
| AI Service | FastAPI, PyTorch, Pydantic |
| Database | PostgreSQL 17, Prisma ORM |
| i18n | i18next (Tiếng Việt mặc định) |
| Linting | Biome (JS/TS), Ruff (Python) |
| Container | Docker, K3s / Kubernetes |

## Yêu Cầu Hệ Thống

- **Node.js** >= 22.0.0
- **pnpm** >= 9.0.0
- **Python** >= 3.12 (cho AI service)
- **PostgreSQL** 17 (hoặc dùng Docker)
- **Docker** & **Docker Compose** (tùy chọn)

## Bắt Đầu Nhanh

### 1. Cài đặt dependencies

```bash
pnpm install
```

### 2. Cấu hình môi trường

```bash
cp .env.example .env
cp apps/frontend/.env.example apps/frontend/.env
cp apps/backend/.env.example apps/backend/.env
cp apps/ai-service/.env.example apps/ai-service/.env
```

Chỉnh sửa các file `.env` theo môi trường của bạn.

### 3. Khởi tạo database

```bash
# Tạo Prisma client
pnpm --filter @kgcentral/database db:generate

# Đồng bộ schema lên database
pnpm --filter @kgcentral/database db:push
```

### 4. Chạy development

```bash
# Chạy tất cả apps cùng lúc
pnpm dev

# Hoặc chạy từng app riêng
pnpm --filter @kgcentral/frontend dev    # Frontend :3000
pnpm --filter @kgcentral/backend dev     # Backend  :4000
```

### 5. Chạy với Docker

```bash
# Build & khởi động tất cả services
pnpm docker:up

# Dừng services
pnpm docker:down
```

## Scripts

| Lệnh | Mô tả |
|------|-------|
| `pnpm dev` | Chạy tất cả apps ở chế độ development |
| `pnpm build` | Build tất cả packages & apps |
| `pnpm lint` | Kiểm tra code style (Biome) |
| `pnpm test` | Chạy tests |
| `pnpm clean` | Xóa build artifacts |
| `pnpm docker:up` | Khởi động Docker Compose |
| `pnpm docker:down` | Dừng Docker Compose |
| `pnpm k3s:deploy` | Deploy lên K3s (dev) |
| `pnpm k3s:undeploy` | Gỡ khỏi K3s (dev) |

## API Reference

### Backend (`/api/v1/`)

#### Auth

| Method | Endpoint | Body | Mô tả |
|--------|----------|------|-------|
| `POST` | `/auth/login` | `{ email, password }` | Đăng nhập |
| `POST` | `/auth/register` | `{ email, password, username, name? }` | Đăng ký |

#### Users

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/users` | Danh sách người dùng |
| `GET` | `/users/:id` | Chi tiết người dùng |

#### Health

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/` | Thông tin API |
| `GET` | `/health` | Health check |

### AI Service

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/health` | Health check |
| `POST` | `/api/v1/inference/` | Chạy AI inference |
| `GET` | `/api/v1/models/` | Danh sách models |
| `POST` | `/api/v1/models/load` | Load model |
| `POST` | `/api/v1/models/unload` | Unload model |

## Database Schema

### User

| Field | Type | Mô tả |
|-------|------|-------|
| `id` | String (cuid) | Primary key |
| `email` | String (unique) | Email |
| `username` | String (unique) | Tên đăng nhập |
| `name` | String? | Tên hiển thị |
| `avatar` | String? | URL avatar |
| `password` | String | Mật khẩu (bcrypt) |
| `role` | Enum | ADMIN / MOD / USER |
| `locale` | String | vi / en |

## Deploy

### Docker Compose (Development)

```bash
docker-compose -f docker-compose.yml up -d
```

### Kubernetes / K3s

```bash
# Dev environment
kubectl apply -k devops/k8s/overlays/dev

# Production
kubectl apply -k devops/k8s/overlays/prod
```

## Đa Ngôn Ngữ

Project hỗ trợ 2 ngôn ngữ:

- **Tiếng Việt** (mặc định)
- **English**

Locale mặc định có thể thay đổi qua config hoặc theo preference người dùng.

## Tài Liệu

- [PROPOSAL.md](./PROPOSAL.md) - Đề cương đồ án chi tiết
- [apps/frontend/README.md](./apps/frontend/README.md) - Frontend documentation
- [apps/backend/README.md](./apps/backend/README.md) - Backend documentation
- [apps/ai-service/README.md](./apps/ai-service/README.md) - AI Service documentation
- [packages/database/README.md](./packages/database/README.md) - Database schema
- [packages/ui/README.md](./packages/ui/README.md) - UI components
- [devops/README.md](./devops/README.md) - DevOps & deployment

## License

Private project - King God Castle fan community site.

---

> *KGCentral is a fan-made community site. King God Castle and all related assets are trademarks of Awesomepiece. This site is not affiliated with or endorsed by Awesomepiece.*
