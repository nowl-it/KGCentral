# @kgcentral/frontend

Giao diện web của KGCentral, xây dựng bằng **Next.js 15** (App Router) và **React 19**.

## Tech Stack

- **Next.js 15** - App Router, Server Components
- **React 19** - UI library
- **Tailwind CSS v4** - Styling
- **shadcn/ui v4** - Component library (từ `@kgcentral/ui`)
- **next-themes** - Dark / Light / System theme
- **i18next** - Đa ngôn ngữ (vi/en)
- **JetBrains Mono** - Font chính

## Cấu Trúc

```
src/
├── app/
│   ├── globals.css       # Import global styles từ @kgcentral/ui
│   ├── layout.tsx        # Root layout (font, theme, providers)
│   └── page.tsx          # Trang chủ
└── components/
    ├── header.tsx         # Header navigation
    └── providers.tsx      # Theme provider + i18n context
```

## Cấu Hình

```env
# apps/frontend/.env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Chạy Development

```bash
# Từ root project
pnpm --filter @kgcentral/frontend dev

# Hoặc từ thư mục frontend
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm --filter @kgcentral/frontend build
```

## Shared Packages

Frontend sử dụng các packages sau:

| Package | Mục đích |
|---------|----------|
| `@kgcentral/config` | App configuration |
| `@kgcentral/types` | Shared TypeScript types |
| `@kgcentral/ui` | Design system & components |

## Theme

Hỗ trợ 3 chế độ qua `next-themes`:

- 🌞 Light mode
- 🌙 Dark mode
- 💻 System (theo OS)

## i18n

i18n được implement client-side qua React Context (`useI18n` hook):

```tsx
const { t, locale, setLocale } = useI18n();

t('common.appName');   // "KGCentral"
t('auth.login');       // "Đăng nhập" (vi) / "Login" (en)
setLocale('en');       // Chuyển sang English
```

Locale lưu trong `localStorage` và persist giữa các phiên.
