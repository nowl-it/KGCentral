# KGCentral

**King God Castle Community Platform** - Website cộng đồng cho game King God Castle với Wiki, Team Builder và hệ thống đề xuất đội hình AI.

## Tính Năng Chính

### ✅ Đã Hoàn Thành

- **Landing Page** - Trang chủ với hero section, feature showcase
- **AI Chat** - Chat với AI về game King God Castle (Qwen2.5 via Ollama)
- **Game Data API** - API tra cứu heroes, relics từ JSON files
- **Team Synergy Calculator** - Tính điểm synergy với 4 factors (Grade S+ đến D)
- **Navigation** - Menu điều hướng với dropdown structure
- **Đa ngôn ngữ** - Hỗ trợ Tiếng Việt và English (i18next)
- **Theme Switching** - Light/Dark/System modes
- **Authentication API** - Login/Register endpoints với JWT
- **User Management API** - Danh sách và chi tiết người dùng

### 🔲 Đang Phát Triển (Planned)

- **Wiki** - Tra cứu thông tin tướng, trang bị, altar, relic
- **Team Builder** - Xây dựng đội hình với drag-and-drop
- **AI Recommendations** - Đề xuất đội hình tự động dựa trên Synergy Scoring
- **Tier List** - Xếp hạng tướng với Wilson Score voting

## Kiến Trúc

```
KGCentral/
├── apps/
│   ├── frontend/        # Next.js 16 - Giao diện web (:3000)
│   ├── backend/         # NestJS 11 - REST API (:4000)
│   └── ai-service/      # FastAPI + PyTorch - AI inference (:5000)
├── packages/
│   ├── config/          # Cấu hình dùng chung
│   ├── database/        # Prisma ORM + PostgreSQL
│   ├── i18n/            # Đa ngôn ngữ (vi/en)
│   ├── types/           # TypeScript types dùng chung
│   └── ui/              # Design system (shadcn/ui + Tailwind v4)
├── docs/                # 📚 Tài liệu dữ liệu game (cho AI training)
│   └── game-data/       # Heroes, Equipment, Altars, Relics, Synergies
└── devops/
    ├── docker/          # Dockerfiles
    └── k8s/             # Kubernetes manifests (Kustomize)
```

## Tech Stack

| Layer | Công nghệ |
|-------|-----------|
| Monorepo | pnpm workspaces + Turborepo |
| Frontend | Next.js 16, React 19, Tailwind CSS v4, shadcn/ui |
| Backend | NestJS 11, Zod, JWT, bcrypt |
| AI Service | FastAPI, PyTorch, Ollama (Qwen2.5) |
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

> ⚠️ **Security Note:** Authentication endpoints are functional but **authorization guards are not yet implemented**. All endpoints are currently unprotected.

#### Auth

| Method | Endpoint | Body | Mô tả | Status |
|--------|----------|------|-------|--------|
| `POST` | `/auth/login` | `{ email, password }` | Đăng nhập, trả về JWT token | ✅ Working |
| `POST` | `/auth/register` | `{ email, password, username, name? }` | Đăng ký tài khoản | ✅ Working |

**Response example:**
```json
// Login response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clxxx...",
    "email": "user@example.com",
    "username": "username",
    "name": "Display Name",
    "role": "USER",
    "locale": "vi"
  }
}
```

#### Users

| Method | Endpoint | Mô tả | Status |
|--------|----------|-------|--------|
| `GET` | `/users` | Danh sách người dùng (không có phân trang) | ✅ Working |
| `GET` | `/users/:id` | Chi tiết người dùng theo CUID | ✅ Working |

> 🔴 **TODO:** Implement JWT guards, pagination, filtering

#### Health

| Method | Endpoint | Mô tả | Status |
|--------|----------|-------|--------|
| `GET` | `/` | Thông tin API version | ✅ Working |
| `GET` | `/health` | Health check với timestamp | ✅ Working |

### AI Service

> ⚠️ **Development Note:** AI Service endpoints are **scaffolding only**. PyTorch is not yet integrated; all endpoints return mock data.

| Method | Endpoint | Mô tả | Status |
|--------|----------|-------|--------|
| `GET` | `/health` | Health check | ✅ Working |
| `POST` | `/api/v1/inference/` | AI inference (returns mock) | 🔲 Mock Only |
| `GET` | `/api/v1/models/` | Danh sách models (hardcoded) | 🔲 Mock Only |
| `POST` | `/api/v1/models/load` | Load model (stub) | 🔲 Stub Only |
| `POST` | `/api/v1/models/unload` | Unload model (stub) | 🔲 Stub Only |

> 🔴 **TODO:** Implement PyTorch model loading, inference logic, synergy scoring algorithm

## Database Schema

> 📊 **Current State:** Database chỉ có **1 model** (User). Các models khác (Hero, Equipment, Altar, Relic, Team, etc.) chưa được định nghĩa.

### User (✅ Implemented)

| Field | Type | Mô tả |
|-------|------|-------|
| `id` | String (cuid) | Primary key |
| `email` | String (unique) | Email |
| `username` | String (unique) | Tên đăng nhập |
| `name` | String? | Tên hiển thị |
| `avatar` | String? | URL avatar |
| `password` | String | Mật khẩu (bcrypt hashed) |
| `role` | Enum | ADMIN / MOD / USER (default: USER) |
| `locale` | String | vi / en (default: "vi") |
| `createdAt` | DateTime | Thời gian tạo |
| `updatedAt` | DateTime | Thời gian cập nhật |

**Table name:** `users`

### 🔲 Planned Models (Chưa Implement)

- **Hero** - Thông tin tướng (stats, skills, roles)
- **Equipment** - Trang bị (weapons, armor, tiers)
- **Altar** - Bàn thờ (types, levels, bonuses)
- **Relic** - Thánh vật (effects, synergies)
- **Team** - Đội hình người dùng lưu
- **TeamVote** - Voting cho tier list
- **Synergy** - Synergy scores giữa các tướng

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

### Dữ Liệu Game (Game Data)

- [docs/](./docs/) - 📚 **Tài liệu dữ liệu game** (Heroes, Equipment, Altars, Relics, Synergies)
  - Dùng để train AI và cung cấp nội dung cho Wiki
  - Format: Markdown, JSON, YAML, CSV
  - Xem [docs/README.md](./docs/README.md) để biết chi tiết cấu trúc

### Đề cương & Đánh giá

- [PROPOSAL.md](./PROPOSAL.md) - Đề cương đồ án chi tiết
- [SECURITY_AUDIT.md](./SECURITY_AUDIT.md) - 🔐 Báo cáo đánh giá bảo mật (20 lỗ hổng phát hiện)
- [CODE_QUALITY_REVIEW.md](./CODE_QUALITY_REVIEW.md) - 📊 Đánh giá chất lượng code từ giảng viên
- [EVALUATION_SUMMARY.md](./EVALUATION_SUMMARY.md) - 🎓 Tổng kết đánh giá (7.5/10)
- [TODO.md](./TODO.md) - 📋 Danh sách khắc phục (35 items)

### Component Documentation

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
