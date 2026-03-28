# @kgcentral/i18n

Package đa ngôn ngữ cho KGCentral, xây dựng trên **i18next**.

> **📊 Status:** ✅ Complete - Vietnamese (vi) and English (en) fully implemented
> **Namespaces:** 3 namespaces (`common`, `breadcrumbs`, `metadata`) with full translations

## Ngôn ngữ hỗ trợ

- **Tiếng Việt** (`vi`) - mặc định
- **English** (`en`)

## Sử dụng

```typescript
import { initI18n } from '@kgcentral/i18n';

const i18n = await initI18n();

i18n.t('common:appName');      // "KGCentral"
i18n.t('common:loading');      // "Đang tải..."
i18n.t('auth:login');          // "Đăng nhập"

// Chuyển ngôn ngữ
await i18n.changeLanguage('en');
i18n.t('common:loading');      // "Loading..."
```

## Namespaces

### `common` (mặc định)

Common UI strings, buttons, messages

| Key | vi | en |
|-----|----|----|
| `appName` | KGCentral | KGCentral |
| `loading` | Đang tải... | Loading... |
| `error` | Đã xảy ra lỗi | An error occurred |
| `create` | Tạo | Create |
| `notFound.title` | Không Tìm Thấy Trang | Page Not Found |
| `notFound.description` | Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển | The page you are looking for does not exist or has been moved |
| `notFound.backHome` | Quay Về Trang Chủ | Back to Home |
| `footer.tagline` | Cộng Đồng King God Castle Hàng Đầu | The Premier King God Castle Community |
| `footer.sections.*` | Product, Resources, Community, Legal | ... |

### `breadcrumbs`

Breadcrumb navigation translations

| Key | vi | en |
|-----|----|----|
| `home` | Trang Chủ | Home |
| `secret` | Bí Mật | Secret |
| `color-palette` | Bảng Màu | Color Palette |

### `metadata`

SEO metadata and PWA manifest

| Key | vi | en |
|-----|----|----|
| `title.default` | KGCentral - Cộng Đồng King God Castle | KGCentral - King God Castle Community |
| `title.template` | %s \| KGCentral | %s \| KGCentral |
| `description` | Wiki cho tướng và vật phẩm, Team Builder AI, Tier List cộng đồng, Tối ưu Altar & Relic | Wiki for characters and items, AI-powered Team Builder, community Tier List voting, Altar & Relic optimizer |
| `manifest.name` | KGCentral - Cộng Đồng King God Castle | KGCentral - King God Castle Community |
| `manifest.shortcuts.*` | PWA app shortcuts | ... |

**Total translation keys:** 50+ across 3 namespaces

## Sử dụng bởi

- `@kgcentral/frontend` - Via i18n.config.ts (client & server-side)
- `@kgcentral/backend` - Imported but not actively used
- `@kgcentral/ai-service` - Used for API response messages
