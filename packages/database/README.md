# @kgcentral/database

Package quản lý database cho KGCentral, sử dụng **Prisma ORM** với **PostgreSQL 17**.

> **📊 Schema Status:** Only **1 model** implemented (User). Game-related models (Hero, Equipment, Altar, Relic, etc.) are not yet defined.

## Sử dụng

```typescript
import { prisma } from '@kgcentral/database';

// Hoặc
import { prisma } from '@kgcentral/database/client';

const users = await prisma.user.findMany();
```

Prisma client được tạo dưới dạng **singleton** - instance được cache trong `globalThis` ở môi trường development để tránh tạo nhiều connections khi hot reload.

## Schema

> **Current State:** Only **User** model exists. Schema completion: ~5% (1 of ~15 planned models)

### ✅ User (Implemented)

| Field | Type | Mô tả |
|-------|------|--------|
| `id` | `String` (cuid) | Primary key |
| `email` | `String` (unique) | Email |
| `username` | `String` (unique) | Tên đăng nhập (3-30 chars) |
| `name` | `String?` | Tên hiển thị (tùy chọn) |
| `avatar` | `String?` | URL avatar (tùy chọn) |
| `password` | `String` | Mật khẩu (bcrypt hashed) |
| `role` | `Role` | Vai trò (mặc định: `USER`) |
| `locale` | `String` | Ngôn ngữ (mặc định: `"vi"`) |
| `createdAt` | `DateTime` | Thời gian tạo |
| `updatedAt` | `DateTime` | Thời gian cập nhật |

**Table name:** `users`

### Role (Enum) - Implemented

- `ADMIN` - Quản trị viên (full access)
- `MOD` - Moderator (moderation rights)
- `USER` - Người dùng thường (default)

### 🔲 Planned Models (Not Yet Defined)

**Game Data Models:**

- **Hero** - Tướng game
  - Fields: id, name, slug, role (HeroRole enum), baseStats (JSON), skills (JSON), imageUrl, lore, tier, etc.
  - Relations: TeamHero (many-to-many with TeamBuild), Synergy, TierVote
  
- **Equipment** - Trang bị
  - Fields: id, name, type (EquipType enum), tier (EquipTier enum), stats (JSON), imageUrl
  - Types: WEAPON, ARMOR
  - Tiers: NORMAL, KING, GOD, KING_GOD

- **Altar** - Bàn thờ
  - Fields: id, name, altarType (AltarType enum), effectsByLevel (JSON)
  - Types: HERO, BLOOD, MAGE, GREED, GIANT, LIFE

- **Relic** - Thánh vật
  - Fields: id, name, description, archetype (string), effect (JSON)

**Team Builder Models:**

- **TeamBuild** - Đội hình được lưu
  - Fields: id, authorId, name, description, gameMode, altarConfig (JSON), relicConfig (JSON), shareCode, isPublic, likes, synergyScore
  - Relations: User (author), TeamHero (heroes), TeamComment

- **TeamHero** - Many-to-many relation
  - Fields: teamId, heroId, position (1-6)

**AI/Algorithm Models:**

- **Synergy** - Synergy scores giữa các tướng
  - Fields: heroId1, heroId2, score (Float), type (string)

**Community Models:**

- **TierVote** - Votes cho tier list
  - Fields: id, heroId, userId, vote (UP/DOWN), gameMode
  - For Wilson Score calculation

- **TeamComment** - Comments trên team builds
  - Fields: id, teamId, authorId, content, createdAt

**Forum Models (Optional):**

- **ForumCategory** - Danh mục forum
- **ForumThread** - Thread trong forum
- **ForumReply** - Replies trong thread

**Asset Library Models (Optional):**

- **Asset** - Game assets uploaded
  - Fields: id, name, type, url, uploadedBy

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
