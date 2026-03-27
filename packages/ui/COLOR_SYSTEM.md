# KGCentral Color System

Color scheme terinspirasi từ King God Castle với theme **Royal Castle** (sáng) và **Night Castle** (tối).

## 🎨 Bảng Màu Chính

### Light Theme - Royal Castle

| Màu | Giá trị | Mục đích |
|-----|---------|----------|
| **Royal Gold** | `oklch(0.72 0.18 85)` | Primary - Màu vàng hoàng gia cho buttons, highlights |
| **Castle Stone** | `oklch(0.55 0.04 260)` | Secondary - Màu xám đá castle |
| **Mystical Purple** | `oklch(0.65 0.2 295)` | Accent - Màu tím huyền bí cho effects đặc biệt |
| **Battle Red** | `oklch(0.55 0.22 25)` | Destructive - Màu đỏ chiến trường |
| **Success Green** | `oklch(0.6 0.17 145)` | Success - Thành công |
| **Warning Orange** | `oklch(0.7 0.18 65)` | Warning - Cảnh báo |
| **Info Blue** | `oklch(0.6 0.18 240)` | Info - Thông tin |

### Dark Theme - Night Castle

Các màu được tăng độ sáng (lightness) và chroma để nổi bật trên nền tối:

- **Royal Gold**: `oklch(0.8 0.2 90)` - Sáng hơn, vàng rực rỡ
- **Mystical Purple**: `oklch(0.7 0.25 300)` - Tím neon huyền bí
- Background: `oklch(0.13 0.03 280)` - Đêm tối với tone tím nhẹ

## 🎯 Cách Sử dụng

### CSS Variables

```tsx
// Tailwind classes
<div className="bg-primary text-primary-foreground">
  Royal Gold Button
</div>

<div className="bg-accent text-accent-foreground">
  Mystical Purple Accent
</div>

<div className="bg-success text-success-foreground">
  Success Message
</div>
```

### Utility Classes

#### Border Effects

```tsx
// Royal gold animated border
<div className="gold-border">...</div>

// Mystical purple border
<div className="purple-border">...</div>
```

#### Text Effects

```tsx
// Gold text with glow
<h1 className="text-shadow-gold">Royal Title</h1>

// Purple text with glow
<h2 className="text-shadow-purple">Mystical Title</h2>

// Gold gradient text
<span className="text-gold-gradient">Premium Feature</span>

// Purple gradient text
<span className="text-purple-gradient">Magic Effect</span>
```

#### Card Styles

```tsx
// Standard castle card
<div className="card-castle">...</div>

// Premium royal card with gold border
<div className="card-royal">...</div>
```

#### Button Effects

```tsx
// Animated gold shimmer button
<button className="btn-gold-shimmer">
  Premium Action
</button>
```

### Tier Ranking Colors

Dùng cho xếp hạng tướng (tier list):

```tsx
<span className="tier-s">S Tier</span>  // Gold
<span className="tier-a">A Tier</span>  // Purple
<span className="tier-b">B Tier</span>  // Blue
<span className="tier-c">C Tier</span>  // Green
<span className="tier-d">D Tier</span>  // Gray
```

### Rarity Colors

Dùng cho độ hiếm của items/equipment:

```tsx
<span className="rarity-legendary">Legendary</span>  // Orange + glow
<span className="rarity-epic">Epic</span>           // Purple + glow
<span className="rarity-rare">Rare</span>           // Blue + glow
<span className="rarity-common">Common</span>        // Gray
```

## ⚡ Animations

### Có sẵn

```tsx
// Royal pulse effect (2s loop)
<div className="animate-royal-pulse">...</div>

// Gold shimmer effect (2.5s loop)
<div className="animate-gold-shimmer">...</div>

// Castle float effect (3s loop)
<div className="animate-castle-float">...</div>
```

### Custom Animation Variables

```css
--animate-royal-pulse: royal-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
--animate-gold-shimmer: gold-shimmer 2.5s linear infinite;
--animate-castle-float: castle-float 3s ease-in-out infinite;
```

## 📊 Chart Colors

Cho biểu đồ thống kê game:

```tsx
--chart-1: Royal Gold    // Vàng
--chart-2: Purple        // Tím
--chart-3: Blue          // Xanh dương
--chart-4: Green         // Xanh lá
--chart-5: Red           // Đỏ
```

## 🎨 Design Principles

1. **Royal Gold** là màu chủ đạo - dùng cho CTAs quan trọng
2. **Purple (Accent)** cho các tính năng đặc biệt, magic effects
3. **Stone Gray** cho text/backgrounds phụ
4. **Semantic colors** (success/warning/info) cho notifications
5. Dark mode sử dụng màu sáng hơn và chroma cao hơn để nổi bật

## 🔧 Customization

Chỉnh sửa trong `packages/ui/src/styles/globals.css`:

```css
:root {
  --primary: oklch(0.72 0.18 85);  /* Royal Gold */
  /* ... */
}

.dark {
  --primary: oklch(0.8 0.2 90);    /* Brighter gold for dark mode */
  /* ... */
}
```

## 💡 Tips

- Dùng `gold-border` hoặc `purple-border` cho highlights quan trọng
- Kết hợp `card-royal` với `animate-royal-pulse` cho premium features
- Tier colors tự động match với game aesthetics
- Rarity colors có glow effect tích hợp sẵn
