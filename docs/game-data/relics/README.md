# Relics Database

Cơ sở dữ liệu về **Cổ Vật** (Relics) trong King God Castle.

## Hệ Thống Relic

### Quy Tắc Chung
- **Tổng Số Relics**: 49 cổ vật
- **Max Upgrade Level**: 4 cấp độ
- **Slot trong Team**: 3 relics
- **Stats Grid**: 4 hàng × 6 cột

### 4 Loại Relics

| Loại | Tên Tiếng Anh | Số lượng |
|------|---------------|----------|
| **Rương Triệu Hồi** | Summon Chest | 13 |
| **Xâm Thực** | Corruption | 14 |
| **Đấu Trường** | Arena | 16 |
| **Đặc Biệt** | Special | 6 |
| **Tổng** | **Total** | **49** |

## Hệ Thống Stats

### 4 Chỉ Số Bổ Trợ Chính

1. **Công Vật Lý** (Physical ATK)
2. **Máu** (HP)
3. **Tốc Đánh** (Attack Speed)
4. **Công Phép** (Magic ATK)

### Stats Grid Structure
- **4 hàng** (rows) - Các level upgrade
- **6 cột** (columns) - Các loại bonus khác nhau
- Mỗi relic có distribution riêng cho 4 stats

## Danh Sách Relics

### Loại 1: Rương Triệu Hồi (Summon Chest) - 13 Relics

**Chức năng**: Tăng cường khả năng triệu hồi và nâng cấp hero

_Chờ cập nhật danh sách 13 relics..._

---

### Loại 2: Xâm Thực (Corruption) - 14 Relics

**Chức năng**: Tăng sát thương, debuff enemies

_Chờ cập nhật danh sách 14 relics..._

---

### Loại 3: Đấu Trường (Arena) - 16 Relics

**Chức năng**: PvP-focused, combat bonuses

_Chờ cập nhật danh sách 16 relics..._

---

### Loại 4: Đặc Biệt (Special) - 6 Relics

**Chức năng**: Unique mechanics, special effects

_Chờ cập nhật danh sách 6 relics..._

---

## Template File (JSON)

```json
{
  "id": "relic_summon_001",
  "name": "Relic Name",
  "nameVi": "Tên Cổ Vật",
  "type": "summon_chest",
  "typeVi": "Rương Triệu Hồi",
  "maxUpgradeLevel": 4,
  "ability": {
    "name": "Ability Name",
    "nameVi": "Tên Năng Lực",
    "description": "Ability description in English",
    "descriptionVi": "Mô tả năng lực bằng tiếng Việt"
  },
  "statsGrid": {
    "rows": 4,
    "columns": 6,
    "distribution": {
      "physicalAtk": [
        [10, 15, 20, 25, 30, 35],
        [20, 25, 30, 35, 40, 45],
        [30, 35, 40, 45, 50, 55],
        [40, 45, 50, 55, 60, 65]
      ],
      "hp": [
        [100, 150, 200, 250, 300, 350],
        [200, 250, 300, 350, 400, 450],
        [300, 350, 400, 450, 500, 550],
        [400, 450, 500, 550, 600, 650]
      ],
      "attackSpeed": [
        [5, 7, 9, 11, 13, 15],
        [10, 12, 14, 16, 18, 20],
        [15, 17, 19, 21, 23, 25],
        [20, 22, 24, 26, 28, 30]
      ],
      "magicAtk": [
        [8, 12, 16, 20, 24, 28],
        [16, 20, 24, 28, 32, 36],
        [24, 28, 32, 36, 40, 44],
        [32, 36, 40, 44, 48, 52]
      ]
    }
  },
  "upgradeRequirements": {
    "level1to2": {
      "materials": [
        { "item": "Relic Fragment", "quantity": 10 }
      ]
    },
    "level2to3": {
      "materials": [
        { "item": "Relic Fragment", "quantity": 20 }
      ]
    },
    "level3to4": {
      "materials": [
        { "item": "Relic Fragment", "quantity": 40 }
      ]
    }
  },
  "synergies": {
    "bestWith": ["hero_east_001", "hero_north_005"],
    "recommendedFor": ["PvE", "Boss Raids"]
  },
  "acquisition": {
    "methods": [
      "Space Rift",
      "Event Rewards",
      "Special Shop"
    ],
    "methodsVi": [
      "Khe Nứt Không Gian",
      "Phần Thưởng Sự Kiện",
      "Cửa Hàng Đặc Biệt"
    ]
  },
  "notes": "Additional notes in English",
  "notesVi": "Ghi chú bổ sung bằng tiếng Việt"
}
```

## Recommended Relic Combinations

### Combo 1: DPS Focus
```
Relic 1: Corruption (High Physical ATK)
Relic 2: Arena (Attack Speed)
Relic 3: Special (Crit Bonus)
```

### Combo 2: Tank Focus
```
Relic 1: Summon Chest (HP)
Relic 2: Special (DEF Bonus)
Relic 3: Arena (Damage Reduction)
```

### Combo 3: Mage Focus
```
Relic 1: Corruption (Magic ATK)
Relic 2: Summon Chest (Mana Regen)
Relic 3: Special (Spell Amplification)
```

---

**Last Updated**: 2026-03-28  
**Hướng Dẫn**: Tạo file JSON cho từng relic với stats grid đầy đủ
