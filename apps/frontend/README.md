# @kgcentral/frontend

Giao diện web của KGCentral - King God Castle Community Platform.

Xây dựng bằng **Next.js 15** (App Router) và **React 19**.

## Tech Stack

- **Next.js 15** - App Router, Server Components, SSG/SSR
- **React 19** - UI library
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component library (từ `@kgcentral/ui`)
- **next-themes** - Dark / Light / System theme
- **i18next** - Đa ngôn ngữ (vi/en)
- **JetBrains Mono** - Font chính

## Cấu Trúc

```
src/
├── app/
│   ├── globals.css       # Import global styles từ @kgcentral/ui
│   ├── layout.tsx        # Root layout (font, theme, providers, metadata)
│   └── page.tsx          # Trang chủ
├── components/
│   ├── header.tsx        # Header navigation
│   └── providers.tsx     # Theme provider + i18n context
└── lib/
    └── api.ts            # API client
public/
├── images/brand/         # Logo, icons, banners
│   ├── svg/              # Source SVG files
│   ├── favicon.png       # 32x32
│   ├── icon.png          # 512x512
│   ├── icon-192.png      # PWA icon
│   ├── icon-384.png      # PWA icon
│   ├── apple-touch-icon.png  # iOS icon
│   ├── logo.png          # Light mode logo
│   ├── logo-dark.png     # Dark mode logo
│   └── og-banner.png     # Social sharing image
└── manifest.json         # PWA manifest
```

## Cấu Hình

```env
# apps/frontend/.env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
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

| Package | Mục đích |
|---------|----------|
| `@kgcentral/config` | App configuration (name, version, locales) |
| `@kgcentral/types` | Shared TypeScript types (User, ApiResponse, etc.) |
| `@kgcentral/ui` | Design system & components (Button, Card, Input) |

## SEO & Metadata

Metadata được cấu hình trong `layout.tsx`:

- Title template: `%s | KGCentral`
- Open Graph images
- Twitter cards
- Favicon & app icons
- PWA manifest

## Theme

Hỗ trợ 3 chế độ qua `next-themes`:

- Light mode
- Dark mode (mặc định)
- System (theo OS)

## i18n

i18n được implement client-side qua React Context (`useI18n` hook):

```tsx
const { t, locale, setLocale } = useI18n();

t('common.appName');   // "KGCentral"
t('auth.login');       // "Đăng nhập" (vi) / "Login" (en)
setLocale('en');       // Chuyển sang English
```

Locale lưu trong `localStorage` và persist giữa các phiên.

## Brand Assets

Xem [public/images/brand/README.md](./public/images/brand/README.md) để biết hướng dẫn sử dụng logo và icons.
