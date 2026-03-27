# @kgcentral/ui

Design system của KGCentral, xây dựng trên **shadcn/ui** và **Tailwind CSS v4**.

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

6 variants x 8 sizes:

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

Gom 7 sub-components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Tieu de</CardTitle>
    <CardDescription>Mo ta</CardDescription>
  </CardHeader>
  <CardContent>Noi dung</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>

<Card size="sm">Compact card</Card>
```

### Input

```tsx
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Mat khau" />
```

## Theming

Su dung **oklch** color space cho tat ca design tokens:

- Ho tro **Light** & **Dark** mode
- CSS variables cho: `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`
- Colors bo sung: `sidebar-*` (5 tokens), `chart-*` (5 colors)
- Border radius: `sm`, `md`, `lg`, `xl` (dua tren `--radius: 0.625rem`)

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Gold Primary | `#FFD700` | Accents, highlights |
| Gold Light | `#FFE44D` | Gradients |
| Gold Dark | `#FFA500` | Gradients |
| Navy Background | `#1a1a2e` | Dark mode background |
| Navy Deep | `#16213e` | Gradient variation |

### Dark mode activation

```html
<html class="dark">...</html>
```

## Exports

| Path | Mo ta |
|------|-------|
| `@kgcentral/ui/globals.css` | Global styles + CSS variables |
| `@kgcentral/ui/components/*` | React components |
| `@kgcentral/ui/lib/*` | Utility functions |
| `@kgcentral/ui/hooks/*` | React hooks |
| `@kgcentral/ui/postcss.config` | PostCSS config |

## Su dung boi

- `@kgcentral/frontend`
