# @kgcentral/frontend

Giao diện web của KGCentral - King God Castle Community Platform.

Xây dựng bằng **Next.js 16** (App Router) và **React 19**.

> **📊 Implementation Status:** ~30% complete (Landing page + Navigation + i18n done, feature pages not yet built)

## Tech Stack

- **Next.js 16.2.1** - App Router, Server Components, SSG/SSR
- **React 19.2.4** - UI library
- **Tailwind CSS v4.2.2** - Styling
- **shadcn/ui** - Component library (từ `@kgcentral/ui`)
- **next-themes 0.4.6** - Dark / Light / System theme
- **i18next 25.10.10** - Đa ngôn ngữ (vi/en)
- **lucide-react & @hugeicons/react** - Icon libraries

## Pages Implemented

### ✅ Built & Working

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `app/page.tsx` | Landing page với hero section, 6 feature cards, CTAs |
| `/chat` | `app/chat/page.tsx` | **AI Chat** - Trò chuyện với AI về King God Castle |
| `/not-found` | `app/not-found.tsx` | Custom 404 page với animations |
| `/secret/color-palette` | `app/(secret)/secret/color-palette/page.tsx` | Design system reference (internal) |

### 🔲 Planned (Not Yet Implemented)

- `/wiki` - Hero/Equipment/Altar/Relic database
- `/wiki/heroes` - Heroes listing
- `/wiki/equipment` - Equipment listing
- `/wiki/altars` - Altars listing
- `/wiki/relics` - Relics listing
- `/team-builder` - Team composition tool
- `/team-builder/saved` - Saved teams
- `/ai-recommendations` - AI-powered suggestions
- `/tier-list` - Community tier rankings
- `/guides` - User guides
- `/auth/sign-in` - Sign in page
- `/auth/sign-up` - Sign up page
- `/profile` - User profile

## Components Built

### Layout Components (7 total)

| Component | File | Purpose |
|-----------|------|---------|
| `Header` | `components/header.tsx` | Top header với logo, Sign In/Get Started buttons |
| `Navigation` | `components/navigation.tsx` | Sticky nav menu với dropdowns (Wiki, Team Builder, AI, Tier List, Guides) |
| `Footer` | `components/footer.tsx` | Footer với 4 sections (Product, Resources, Community, Legal) |
| `LinksHierarchy` | `components/links-hierarchy.tsx` | Breadcrumb navigation (auto-generated) |
| `ThemeToggle` | `components/theme-toggle.tsx` | Theme switcher dropdown (Light/Dark/System) |
| `LanguageSwitcher` | `components/language-switcher.tsx` | Language selector (Vietnamese/English) |
| `Providers` | `components/providers.tsx` | Client-side providers wrapper (Theme + i18n) |

### UI Components from @kgcentral/ui

- `Button` - Used in header, navigation, 404 page, theme toggle
- `NavigationMenu` - Main navigation with dropdowns
- `DropdownMenu` - Theme selector
- `Breadcrumb` - Breadcrumb navigation
- `ColorPalette` - Design reference (/secret/color-palette)

## Cấu Trúc

```
src/
├── app/
│   ├── (secret)/secret/color-palette/page.tsx  # Design reference
│   ├── layout.tsx                              # Root layout (204 lines)
│   ├── page.tsx                                # Landing page (204 lines)
│   ├── not-found.tsx                           # 404 page (42 lines)
│   ├── loading.tsx                             # Loading UI
│   ├── metadata.ts                             # SEO metadata (102 lines)
│   ├── manifest.ts                             # PWA manifest (111 lines)
│   └── sitemap.ts                              # Sitemap (17 lines)
├── components/
│   ├── header.tsx                              # 37 lines
│   ├── navigation.tsx                          # 159 lines
│   ├── footer.tsx                              # 162 lines
│   ├── links-hierarchy.tsx                     # 71 lines
│   ├── theme-toggle.tsx                        # 45 lines
│   ├── language-switcher.tsx                   # 14 lines
│   └── providers.tsx                           # 17 lines
├── lib/
│   ├── i18n.config.ts                          # i18n configuration (14 lines)
│   └── api.ts                                  # API client
└── proxy.ts                                    # API proxy
public/
├── images/
│   ├── logo-full.png
│   ├── logo.png
│   └── icons/                                  # Feature icons (PNG)
├── favicon.ico
├── manifest.json                               # PWA manifest
└── robots.txt
```

**Total Lines of Code:** ~1,220 LOC (src/ directory)

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

| Package | Usage | Imports |
|---------|-------|---------|
| `@kgcentral/config` | App configuration | `appConfig` |
| `@kgcentral/types` | TypeScript types | `User`, `ApiResponse`, `Locale` |
| `@kgcentral/ui` | Design system | `Button`, `NavigationMenu`, `DropdownMenu`, `Breadcrumb`, `ColorPalette`, `globals.css` |
| `@kgcentral/i18n` | Translations | `locales/vi/*`, `locales/en/*` (3 namespaces: common, breadcrumbs, metadata) |

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

## i18n (Internationalization)

**Status:** ✅ Fully implemented

### Configuration

- **Default locale:** Vietnamese (`vi`)
- **Supported locales:** Vietnamese (`vi`), English (`en`)
- **Namespaces:** `common`, `breadcrumbs`, `metadata`
- **Detection:** Browser language detector (automatic)
- **Persistence:** LocalStorage

### Usage

**Server-side (Server Components):**
```tsx
import { getT } from '@/lib/i18n.config';

const t = await getT('vi', 'common');
const title = t('appName'); // "KGCentral"
```

**Client-side (Client Components):**
```tsx
'use client';
import { useT } from '@/lib/i18n.config';

const t = useT('common');
const welcome = t('notFound.title'); // "Page Not Found"
```

### Features Working

- ✅ Automatic language detection
- ✅ Language switcher component (Header)
- ✅ Breadcrumbs auto-translate
- ✅ Footer links translated
- ✅ Metadata (title, description) translated
- ✅ Server-side and client-side rendering

## Features Implemented

### ✅ Working

- **Landing Page** - Hero section, 6 feature cards, CTAs
- **AI Chat** - Chat với AI về game (Qwen2.5 via Ollama)
- **Navigation** - Sticky menu with dropdown structure
- **Theme Switching** - Light/Dark/System modes
- **i18n** - Vietnamese/English full support
- **SEO** - Complete metadata, Open Graph, Twitter Cards
- **PWA** - Manifest with app shortcuts
- **Responsive Design** - Mobile-first with Tailwind
- **404 Page** - Custom not found page
- **Breadcrumbs** - Auto-generated navigation

### 🔲 Not Yet Implemented

- Wiki pages (Heroes, Equipment, Altars, Relics)
- Team Builder interface
- AI Recommendations UI
- Tier List voting
- Auth pages (Sign In/Up)
- User profile
- Forum/Community

## Next Steps

1. **Build Wiki pages** - Create listing and detail pages for Heroes, Equipment, Altars, Relics
2. **Team Builder UI** - Implement drag-and-drop team composition interface
3. **Auth pages** - Sign in, sign up, password reset
4. **API Integration** - Connect to backend endpoints
5. **AI Recommendations UI** - Display synergy scores and team suggestions
