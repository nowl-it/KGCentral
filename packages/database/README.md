# @kgcentral/database

Package quản lý database cho KGCentral, sử dụng **Prisma ORM** với **PostgreSQL**.

## Sử dụng

```typescript
import { prisma } from '@kgcentral/database';

// Hoặc
import { prisma } from '@kgcentral/database/client';

const users = await prisma.user.findMany();
```

Prisma client được tạo dưới dạng **singleton** - instance được cache trong `globalThis` ở môi trường development để tránh tạo nhiều connections khi hot reload.

## Schema

### User

| Field | Type | Mô tả |
|-------|------|--------|
| `id` | `String` (cuid) | Primary key |
| `email` | `String` (unique) | Email |
| `username` | `String` (unique) | Tên đăng nhập |
| `name` | `String?` | Tên hiển thị (tùy chọn) |
| `avatar` | `String?` | URL avatar (tùy chọn) |
| `password` | `String` | Mật khẩu (bcrypt hash) |
| `role` | `Role` | Vai trò (mặc định: `USER`) |
| `locale` | `String` | Ngôn ngữ (mặc định: `"vi"`) |
| `createdAt` | `DateTime` | Thời gian tạo |
| `updatedAt` | `DateTime` | Thời gian cập nhật |

### Role (Enum)

- `ADMIN` - Quản trị viên
- `MOD` - Moderator
- `USER` - Người dùng thường

## Scripts

```bash
# Tạo Prisma client
pnpm --filter @kgcentral/database db:generate

# Đồng bộ schema lên database (dev)
pnpm --filter @kgcentral/database db:push

# Tạo migration
pnpm --filter @kgcentral/database db:migrate

# Mở Prisma Studio (GUI)
pnpm --filter @kgcentral/database db:studio
```

## Cấu Hình

Database URL được cấu hình qua biến môi trường:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/kgcentral
```

## Sử dụng bởi

- `@kgcentral/backend`
