# @kgcentral/ui

Design system của KGCentral, xây dựng trên **shadcn/ui v4** và **Tailwind CSS v4**.

## Cài Đặt

Package này được sử dụng như internal workspace dependency:

```json
{
  "dependencies": {
    "@kgcentral/ui": "workspace:*"
  }
}
```

## Sử Dụng

### Import styles

```tsx
// Trong layout hoặc entry file
import '@kgcentral/ui/globals.css';
```

### Import components

```tsx
import { Button } from '@kgcentral/ui/components/button';
import { Card, CardHeader, CardTitle, CardContent } from '@kgcentral/ui/components/card';
import { Input } from '@kgcentral/ui/components/input';
```

### Import utilities

```tsx
import { cn } from '@kgcentral/ui/lib/utils';
```

## Components

### Button

6 variants × 8 sizes:

**Variants:** `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`

**Sizes:** `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`

```tsx
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive" size="sm">Delete</Button>
<Button variant="ghost" size="icon"><Icon /></Button>
<Button asChild><a href="/">Link</a></Button>
```

### Card

Gồm 7 sub-components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Tiêu đề</CardTitle>
    <CardDescription>Mô tả</CardDescription>
  </CardHeader>
  <CardContent>Nội dung</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>

<Card size="sm">Compact card</Card>
```

### Input

```tsx
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Mật khẩu" />
```

## Theming

Sử dụng **oklch** color space cho tất cả design tokens:

- Hỗ trợ **Light** & **Dark** mode
- CSS variables cho: `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`
- Colors bổ sung: `sidebar-*` (5 tokens), `chart-*` (5 colors)
- Border radius: `sm`, `md`, `lg`, `xl` (dựa trên `--radius: 0.625rem`)

### Dark mode activation

```html
<html class="dark">...</html>
```

## Exports

| Path | Mô tả |
|------|--------|
| `@kgcentral/ui/globals.css` | Global styles + CSS variables |
| `@kgcentral/ui/components/*` | React components |
| `@kgcentral/ui/lib/*` | Utility functions |
| `@kgcentral/ui/hooks/*` | React hooks |
| `@kgcentral/ui/postcss.config` | PostCSS config |

## Sử dụng bởi

- `@kgcentral/frontend`
