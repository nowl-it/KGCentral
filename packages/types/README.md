# @kgcentral/types

TypeScript types dùng chung cho toàn bộ KGCentral monorepo.

> **📊 Status:** ✅ Complete - 7 types/interfaces exported and in use

## Sử dụng

```typescript
import type { ApiResponse, User, Locale } from '@kgcentral/types';
```

## Types

### `Locale`

```typescript
type Locale = 'vi' | 'en';
```

### `ApiResponse<T>`

Response chuẩn cho tất cả API endpoints.

```typescript
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  locale: Locale;
  timestamp: string;
}
```

### `PaginationParams`

```typescript
interface PaginationParams {
  page: number;
  limit: number;
}
```

### `PaginatedResponse<T>`

```typescript
interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### `Role`

```typescript
type Role = 'ADMIN' | 'MOD' | 'USER';
```

### `User`

```typescript
interface User {
  id: string;
  email: string;
  username: string;
  name: string | null;
  avatar: string | null;
  role: Role;
  locale: Locale;
  createdAt: string;
  updatedAt: string;
}
```

### `AuthTokens`

```typescript
interface AuthTokens {
  accessToken: string;
  expiresIn: number;
}
```

## Sử dụng bởi

- `@kgcentral/frontend`
- `@kgcentral/backend`
- `@kgcentral/ui`
