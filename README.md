# KGCentral

**AI & IoT Platform cho Raspberry Pi** - Nền tảng quản lý tập trung tích hợp AI inference, được thiết kế tối ưu cho thiết bị edge computing.

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
| Backend | NestJS 11, Zod |
| AI Service | FastAPI, PyTorch, Pydantic |
| Database | PostgreSQL 17, Prisma ORM |
| i18n | i18next (Tiếng Việt mặc định) |
| Linting | Biome (JS/TS), Ruff (Python) |
| Container | Docker, K3s / Kubernetes |

## Yêu Cầu Hệ Thống

- **Node.js** ≥ 22.0.0
- **pnpm** ≥ 9.0.0
- **Python** ≥ 3.12 (cho AI service)
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

Chỉnh sửa các file `.env` cho phù hợp với môi trường của bạn.

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
|-------|--------|
| `pnpm dev` | Chạy tất cả apps ở chế độ development |
| `pnpm build` | Build tất cả packages & apps |
| `pnpm lint` | Kiểm tra code style (Biome) |
| `pnpm test` | Chạy tests |
| `pnpm clean` | Xóa build artifacts |
| `pnpm docker:up` | Khởi động Docker Compose |
| `pnpm docker:down` | Dừng Docker Compose |
| `pnpm k3s:deploy` | Deploy lên K3s (dev) |
| `pnpm k3s:undeploy` | Gỡ khỏi K3s (dev) |

## Cấu Trúc API

### Backend (`/api/v1/`)

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| `GET` | `/` | Thông tin API |
| `GET` | `/health` | Health check |
| `POST` | `/auth/login` | Đăng nhập |
| `POST` | `/auth/register` | Đăng ký |
| `GET` | `/users` | Danh sách người dùng |
| `GET` | `/users/:id` | Chi tiết người dùng |

### AI Service

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| `GET` | `/health` | Health check |
| `POST` | `/api/v1/inference/` | Chạy AI inference |
| `GET` | `/api/v1/models/` | Danh sách models |
| `POST` | `/api/v1/models/load` | Load model |
| `POST` | `/api/v1/models/unload` | Unload model |

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

- 🇻🇳 **Tiếng Việt** (mặc định)
- 🇬🇧 **English**

Locale mặc định có thể thay đổi qua config hoặc theo preference người dùng.

## License

Private project.
