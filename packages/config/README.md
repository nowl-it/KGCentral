# @kgcentral/config

Cấu hình dùng chung cho toàn bộ KGCentral monorepo.

## Sử dụng

```typescript
import { appConfig } from '@kgcentral/config';

appConfig.name;             // "KGCentral"
appConfig.version;          // "1.0.0"
appConfig.apiPrefix;        // "/api"
appConfig.defaultLocale;    // "vi"
appConfig.supportedLocales; // ["vi", "en"]
appConfig.corsOrigins;      // từ env hoặc ["http://localhost:3000"]
```

## Types

```typescript
import type { Locale } from '@kgcentral/config';
// "vi" | "en"
```

## Cấu Hình

| Thuộc tính | Giá trị | Mô tả |
|------------|---------|--------|
| `name` | `"KGCentral"` | Tên ứng dụng |
| `version` | `"1.0.0"` | Phiên bản |
| `apiPrefix` | `"/api"` | Prefix cho API routes |
| `defaultLocale` | `"vi"` | Ngôn ngữ mặc định |
| `supportedLocales` | `["vi", "en"]` | Các ngôn ngữ hỗ trợ |
| `corsOrigins` | env `CORS_ORIGINS` | Origins cho CORS |

## Sử dụng bởi

- `@kgcentral/frontend`
- `@kgcentral/backend`
- `@kgcentral/i18n`
