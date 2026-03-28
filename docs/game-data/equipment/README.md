# Equipment Database

Cơ sở dữ liệu về **Trang Bị** (Equipment) trong King God Castle.

## Tổng Quan Equipment System

King God Castle có 3 loại trang bị chính:

1. **Accessories** (Trang Sức) - 5 slots per hero
2. **Legacy** (Bảo Cụ) - 1 slot per hero
3. **Rift Equipment** (Trang Bị Khe Nứt) - 6 slots per team

---

## 1. Accessories (Trang Sức)

### Quy Tắc
- Mỗi hero có **5 slots** cho accessories
- Có thể nâng cấp và enchant

_Chờ cập nhật danh sách accessories..._

---

## 2. Legacy Equipment (Bảo Cụ)

### Quy Tắc
- Mỗi hero có **1 slot** cho legacy item
- Thường là high-tier equipment với unique effects

_Chờ cập nhật danh sách legacy items..._

---

## 3. Rift Equipment (Trang Bị Khe Nứt)

### Hệ Thống Rift Equipment

#### Nguồn: Tinh Thể Khe Nứt (Rift Crystals)
- **Khe Nứt Không Gian** (Space Rift) - source of crystals
- **3 Cách Xử Lý Crystals**:
  1. **Sản Xuất** (Craft): Tổ hợp 2 base equipment → 1 rift equipment
  2. **Phân Hủy** (Dissolve): Xóa crystal → nhận 1 random rift equipment
  3. **Thanh Tẩy** (Purify): Xóa crystal → nhận 2 random rift equipment

#### Base Equipment (Trang Bị Cơ Bản)
4 loại base equipment dùng để craft:
- **Thần Kiếm** (Divine Sword)
- **Thần Giáp** (Divine Armor)
- **Thần Cung** (Divine Bow)
- **Thần Trượng** (Divine Staff)

### 6 Loại Rift Equipment

| Tên Tiếng Việt | Tên Tiếng Anh | Công Thức Chế Tạo |
|----------------|---------------|-------------------|
| **Thương Dài** | Spear | Thần Giáp + Thần Cung |
| **Mặt Nạ** | Mask | Thần Giáp + Thần Trượng |
| **Quả Cầu** | Orb | Thần Cung + Thần Trượng |
| **Khiên** | Shield | Thần Kiếm + Thần Giáp |
| **Đoản Kiếm** | Short Sword | Thần Kiếm + Thần Trượng |
| **Song Kiếm** | Dual Swords | Thần Kiếm + Thần Cung |

### Stats System

Mỗi rift equipment có:
- **2 Chỉ Số Chủ Lực** (Main Stats) - Primary bonuses
- **3 Chỉ Số Bổ Trợ** (Sub Stats) - Secondary bonuses

### Upgrade System
- **Max Upgrade Level**: 4 cấp độ
- Mỗi cấp độ tăng cả main stats và sub stats

---

## Template Files (JSON)

### Accessory Template

```json
{
  "id": "acc_001",
  "name": "Accessory Name",
  "nameVi": "Tên Trang Sức",
  "type": "accessory",
  "tier": "Legendary",
  "tierVi": "Huyền Thoại",
  "stats": {
    "physicalAtk": 100,
    "hp": 500,
    "crit": 5
  },
  "recommendedFor": ["Warrior", "Ranger"],
  "recommendedForVi": ["Chiến Binh", "Xạ Thủ"]
}
```

### Legacy Template

```json
{
  "id": "legacy_001",
  "name": "Legacy Name",
  "nameVi": "Tên Bảo Cụ",
  "type": "legacy",
  "tier": "Mythic",
  "tierVi": "Thần Thoại",
  "uniqueEffect": {
    "name": "Effect Name",
    "nameVi": "Tên Hiệu Ứng",
    "description": "Unique effect description",
    "descriptionVi": "Mô tả hiệu ứng đặc biệt"
  },
  "stats": {
    "physicalAtk": 200,
    "magicAtk": 200,
    "hp": 1000
  }
}
```

### Rift Equipment Template

```json
{
  "id": "rift_spear_001",
  "name": "Legendary Spear",
  "nameVi": "Thương Dài Huyền Thoại",
  "type": "rift_spear",
  "typeVi": "Thương Dài",
  "craftRecipe": {
    "ingredient1": "divine_armor",
    "ingredient1Vi": "Thần Giáp",
    "ingredient2": "divine_bow",
    "ingredient2Vi": "Thần Cung"
  },
  "maxUpgradeLevel": 4,
  "mainStats": [
    {
      "stat": "physicalAtk",
      "statVi": "Công Vật Lý",
      "baseValue": 150,
      "perLevelIncrease": 30
    },
    {
      "stat": "attackSpeed",
      "statVi": "Tốc Đánh",
      "baseValue": 20,
      "perLevelIncrease": 5
    }
  ],
  "subStats": [
    {
      "stat": "crit",
      "statVi": "Chí Mạng",
      "baseValue": 8,
      "perLevelIncrease": 2
    },
    {
      "stat": "critDmg",
      "statVi": "Sát Thương Chí Mạng",
      "baseValue": 15,
      "perLevelIncrease": 5
    },
    {
      "stat": "hp",
      "statVi": "Máu",
      "baseValue": 300,
      "perLevelIncrease": 75
    }
  ],
  "upgradeStats": {
    "level1": {
      "mainStats": { "physicalAtk": 150, "attackSpeed": 20 },
      "subStats": { "crit": 8, "critDmg": 15, "hp": 300 }
    },
    "level2": {
      "mainStats": { "physicalAtk": 180, "attackSpeed": 25 },
      "subStats": { "crit": 10, "critDmg": 20, "hp": 375 }
    },
    "level3": {
      "mainStats": { "physicalAtk": 210, "attackSpeed": 30 },
      "subStats": { "crit": 12, "critDmg": 25, "hp": 450 }
    },
    "level4": {
      "mainStats": { "physicalAtk": 240, "attackSpeed": 35 },
      "subStats": { "crit": 14, "critDmg": 30, "hp": 525 }
    }
  },
  "recommendedFor": ["Physical DPS", "Rangers"],
  "recommendedForVi": ["DPS Vật Lý", "Xạ Thủ"]
}
```

---

## Rift Equipment Crafting Chart

```
Divine Sword (Thần Kiếm) ─┬─ + Divine Armor → Shield (Khiên)
                          ├─ + Divine Bow → Dual Swords (Song Kiếm)
                          └─ + Divine Staff → Short Sword (Đoản Kiếm)

Divine Armor (Thần Giáp) ─┬─ + Divine Bow → Spear (Thương Dài)
                          ├─ + Divine Staff → Mask (Mặt Nạ)
                          └─ + Divine Sword → Shield (Khiên)

Divine Bow (Thần Cung) ───┬─ + Divine Staff → Orb (Quả Cầu)
                          ├─ + Divine Armor → Spear (Thương Dài)
                          └─ + Divine Sword → Dual Swords (Song Kiếm)

Divine Staff (Thần Trượng) ┬─ + Divine Bow → Orb (Quả Cầu)
                          ├─ + Divine Armor → Mask (Mặt Nạ)
                          └─ + Divine Sword → Short Sword (Đoản Kiếm)
```

---

## Recommended Rift Equipment Sets

### Set 1: Physical DPS
```
1. Spear (Thương Dài) - High Physical ATK
2. Dual Swords (Song Kiếm) - Attack Speed
3. Shield (Khiên) - Defense + ATK
4-6. Random based on sub-stats needed
```

### Set 2: Magic DPS
```
1. Orb (Quả Cầu) - Magic ATK
2. Mask (Mặt Nạ) - Magic Penetration
3. Short Sword (Đoản Kiếm) - Balanced
4-6. Random based on sub-stats needed
```

### Set 3: Tank
```
1. Shield (Khiên) - High DEF
2. Mask (Mặt Nạ) - HP Bonus
3. Spear (Thương Dài) - Counter-attack
4-6. Random based on sub-stats needed
```

---

**Last Updated**: 2026-03-28  
**Hướng Dẫn**: Tạo file JSON riêng cho từng loại rift equipment với stats chi tiết
