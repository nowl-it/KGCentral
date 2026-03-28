# @kgcentral/ui

Design system của KGCentral, xây dựng trên **shadcn/ui** và **Tailwind CSS v4**.

> **📊 Components:** 7 components built (Button, Card, Input, Breadcrumb, Dropdown Menu, Navigation Menu, ColorPalette)
> **🎨 Theme:** Royal Castle theme với OkLch color space

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

## Components Implemented (7 total)

### 1. Button (63 lines)

6 variants × 8 sizes = 48 combinations

**Variants:** `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`

**Sizes:** `xs`, `sm`, `default`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`

```tsx
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive" size="sm">Delete</Button>
<Button variant="ghost" size="icon"><Icon /></Button>
<Button asChild><Link href="/">Link</Link></Button>
```

### 2. Card (91 lines)

7 sub-components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`

```tsx
<Card>
  <CardHeader>
    <CardTitle>Tiêu đề</CardTitle>
    <CardDescription>Mô tả</CardDescription>
    <CardAction><Button size="icon-sm">✕</Button></CardAction>
  </CardHeader>
  <CardContent>Nội dung</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>

<Card size="sm">Compact card</Card>
```

### 3. Input (18 lines)

```tsx
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Mật khẩu" />
```

### 4. Breadcrumb (105 lines)

Sub-components: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator`, `BreadcrumbPage`

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### 5. Dropdown Menu (242 lines)

Full-featured dropdown with items, groups, checkboxes, radio buttons, separators, labels, shortcuts

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild><Button>Open</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Item 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 6. Navigation Menu (192 lines)

Horizontal navigation with dropdowns

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/item">Item</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### 7. ColorPalette (277 lines)

Design system showcase - displays all theme colors with variables and descriptions

```tsx
<ColorPalette />
```

**Total Component LOC:** 988 lines

## Theming - Royal Castle Theme

Sử dụng **OkLch** color space cho tất cả design tokens:

- Hỗ trợ **Light** & **Dark** mode
- CSS variables cho: `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `success`, `warning`, `border`, `input`, `ring`
- Sidebar colors: `sidebar-background`, `sidebar-foreground`, etc.
- Chart colors: `chart-1` through `chart-5`
- Border radius: Based on `--radius: 0.625rem`

### Brand Colors (OkLch)

| Token | OkLch Value | Description |
|-------|-------------|-------------|
| **Primary** (Royal Gold) | `oklch(0.72 0.18 85)` | Main action color, highlights |
| **Secondary** (Castle Stone) | `oklch(0.55 0.04 260)` | Secondary actions |
| **Accent** (Mystical Purple) | `oklch(0.65 0.2 295)` | Special highlights |
| **Destructive** (Battle Red) | `oklch(0.55 0.22 25)` | Danger actions |
| **Success** (Green) | `oklch(0.6 0.17 145)` | Success states |
| **Warning** (Orange) | `oklch(0.7 0.18 65)` | Warning states |
| **Muted** (Stone) | `oklch(0.92 0.015 260)` | Disabled/inactive |
| **Background** | `oklch(0.97 0.01 60)` | Light theme bg |
| **Ring** | `foreground / 10` opacity | Focus ring |

### Dark mode activation

```html
<html class="dark">...</html>
```

## Exports

| Path | Mô tả |
|------|-------|
| `@kgcentral/ui/globals.css` | Global styles + CSS variables |
| `@kgcentral/ui/components/button` | Button component |
| `@kgcentral/ui/components/card` | Card + sub-components |
| `@kgcentral/ui/components/input` | Input component |
| `@kgcentral/ui/components/breadcrumb` | Breadcrumb navigation |
| `@kgcentral/ui/components/dropdown-menu` | Dropdown menu |
| `@kgcentral/ui/components/navigation-menu` | Navigation menu |
| `@kgcentral/ui/components/color-palette` | Color palette showcase |
| `@kgcentral/ui/lib/utils` | `cn()` utility for class merging |
| `@kgcentral/ui/postcss.config` | PostCSS configuration |

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@radix-ui/react-*` | 1.x | Unstyled accessible components |
| `lucide-react` | 1.7.0 | Icon library (basic) |
| `@hugeicons/react` | 1.1.6 | Icon library (premium) |
| `class-variance-authority` | 0.7.1 | Component variants |
| `clsx` | 2.1.1 | Conditional classNames |
| `tailwind-merge` | 3.5.0 | Merge Tailwind classes |
| `tailwindcss` | 4.2.2 | Styling framework |

## Sử dụng bởi

- `@kgcentral/frontend` - Main web app
