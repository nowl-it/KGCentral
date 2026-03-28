# Metadata Translation System

Hệ thống metadata của frontend KGCentral hỗ trợ đa ngôn ngữ (vi/en) thông qua i18n.

## Cấu trúc Translation Files

Các file translation cho metadata nằm trong:
- `packages/i18n/src/locales/vi/metadata.json` (Tiếng Việt)
- `packages/i18n/src/locales/en/metadata.json` (Tiếng Anh)

## Nội dung Metadata Translation

Mỗi file bao gồm:

### 1. Basic Metadata
- `title.default`: Tiêu đề mặc định của site
- `title.template`: Template cho tiêu đề của từng page
- `description`: Mô tả tổng quan về site
- `keywords`: Array các từ khóa SEO

### 2. Open Graph
- `openGraph.title`: Tiêu đề khi chia sẻ lên social media
- `openGraph.description`: Mô tả khi chia sẻ
- `openGraph.imageAlt`: Alt text cho hình ảnh OG

### 3. Twitter Card
- `twitter.title`: Tiêu đề cho Twitter Card
- `twitter.description`: Mô tả cho Twitter Card

### 4. PWA Manifest
- `manifest.name`: Tên đầy đủ của app
- `manifest.shortName`: Tên rút gọn
- `manifest.description`: Mô tả cho PWA
- `manifest.shortcuts.*`: Shortcuts cho các trang chính (Wiki, Team Builder, Tier List, Altar, Relic)

## Cách hoạt động

### metadata.ts
File `apps/frontend/src/app/metadata.ts` sử dụng i18n để load translations:

```typescript
const { t, lng } = await getT();
const title = t('metadata:title.default');
const description = t('metadata:description');
```

Metadata được generate động theo ngôn ngữ của người dùng.

### manifest.ts
File `apps/frontend/src/app/manifest.ts` cũng sử dụng i18n:

```typescript
initServerI18next(i18nConfig);
const { t } = await getT();
const name = t('metadata:manifest.name');
```

Next.js sẽ serve manifest động tại `/manifest.webmanifest`.

### sitemap.ts
File `apps/frontend/src/app/sitemap.ts` tạo sitemap động cho SEO.

## Cập nhật Translations

Để cập nhật metadata:

1. Chỉnh sửa file JSON trong `packages/i18n/src/locales/[lang]/metadata.json`
2. Build lại frontend: `pnpm --filter @kgcentral/frontend build`
3. Metadata sẽ tự động cập nhật theo ngôn ngữ người dùng

## Files liên quan

- `apps/frontend/src/app/metadata.ts` - Generate Next.js metadata
- `apps/frontend/src/app/manifest.ts` - Generate PWA manifest
- `apps/frontend/src/app/sitemap.ts` - Generate XML sitemap
- `apps/frontend/src/lib/i18n.config.ts` - i18n configuration
- `packages/i18n/src/locales/*/metadata.json` - Translation files

## SEO Features

✅ Dynamic metadata theo ngôn ngữ  
✅ Open Graph tags cho social sharing  
✅ Twitter Cards  
✅ PWA Manifest với shortcuts  
✅ XML Sitemap  
✅ robots.txt  
✅ Alternate language tags
