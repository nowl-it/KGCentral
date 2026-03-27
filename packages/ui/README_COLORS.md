# Color System Guide

Hệ thống màu của KGCentral được thiết kế cho nền tảng cộng đồng game King God Castle.

## 📚 Documentation

- **[COLOR_SYSTEM.md](./COLOR_SYSTEM.md)** - Tài liệu đầy đủ về color scheme, cách sử dụng, và utilities
- **[color-palette.tsx](./src/components/color-palette.tsx)** - Component showcase tất cả màu sắc

## 🎨 Theme Concept

### Royal Castle (Light Mode)
- **Primary**: Royal Gold - Vàng hoàng gia cho elements quan trọng
- **Secondary**: Castle Stone - Xám đá lâu đài cho backgrounds
- **Accent**: Mystical Purple - Tím huyền bí cho magic/special effects

### Night Castle (Dark Mode)
- Tăng độ sáng (lightness) và chroma để nổi bật trên nền tối
- Gold và Purple có glow effects mạnh hơn
- Stone background tối hơn với tone tím nhẹ

## 🚀 Quick Start

### Import CSS
```tsx
import '@kgcentral/ui/globals.css';
```

### Sử dụng Semantic Colors
```tsx
// Primary - Royal Gold
<button className="bg-primary text-primary-foreground">
  Click Me
</button>

// Accent - Mystical Purple
<div className="bg-accent text-accent-foreground">
  Special Feature
</div>

// Success, Warning, Info, Destructive
<div className="bg-success text-success-foreground">Success!</div>
<div className="bg-warning text-warning-foreground">Warning!</div>
<div className="bg-info text-info-foreground">Info</div>
<div className="bg-destructive text-destructive-foreground">Error!</div>
```

### Utility Classes

```tsx
// Royal Gold Border với gradient
<div className="gold-border p-4">Premium Content</div>

// Purple border cho magic effects
<div className="purple-border p-4">Mystical Feature</div>

// Text effects
<h1 className="text-shadow-gold">Glowing Gold Title</h1>
<h2 className="text-gold-gradient">Gradient Text</h2>

// Card styles
<div className="card-castle">Standard Card</div>
<div className="card-royal">Premium Card</div>

// Animations
<div className="animate-royal-pulse">Pulsing Element</div>
<button className="btn-gold-shimmer">Shimmering Button</button>
```

### Tier & Rarity System

```tsx
// Tier colors (S, A, B, C, D)
<span className="tier-s">S Tier</span>  // Gold
<span className="tier-a">A Tier</span>  // Purple

// Rarity với glow
<span className="rarity-legendary">Legendary</span>  // Orange + glow
<span className="rarity-epic">Epic</span>           // Purple + glow
<span className="rarity-rare">Rare</span>           // Blue + glow
```

## 🎯 Design Principles

1. **Royal Gold là primary** - Dùng cho CTAs, highlights quan trọng
2. **Purple cho special features** - Magic, AI, premium features
3. **Stone Gray cho neutral** - Text, backgrounds, borders
4. **Semantic colors rõ ràng** - Success (green), Warning (orange), Info (blue), Error (red)
5. **Dark mode contrasts** - Màu sáng hơn, chroma cao hơn cho dark backgrounds

## 📊 Color Values (OKLCH)

OKLCH format: `oklch(lightness chroma hue / alpha)`

- **Lightness**: 0-1 (0 = black, 1 = white)
- **Chroma**: 0-0.4 (saturation)
- **Hue**: 0-360 degrees

Example: `oklch(0.72 0.18 85)` = Royal Gold
- Lightness: 0.72 (moderately bright)
- Chroma: 0.18 (vibrant)
- Hue: 85° (yellow-gold)

## 🧪 Testing

Xem demo tất cả colors:

```tsx
import { ColorPalette } from '@kgcentral/ui/components/color-palette';

export default function ColorsPage() {
  return <ColorPalette />;
}
```

## 📝 Notes

- Tất cả colors support dark mode tự động
- Dùng OKLCH color space cho perceptual uniformity
- Variables có thể override trong app-specific themes
- Rarity/tier classes thiết kế cho game items/characters
