# Heroes Database

Cơ sở dữ liệu về tất cả các **Anh Hùng** (Heroes) trong King God Castle.

## Tổng Quan Heroes

### Số lượng theo Miền (Region)

| Miền | Tên Tiếng Anh | Số lượng |
|------|---------------|----------|
| **Đông** | East | 13 |
| **Tây** | West | 12 |
| **Nam** | South | 14 |
| **Bắc** | North | 19 |
| **Trung** | Central | 12 |
| **Tổng cộng** | **Total** | **70** |

### Hero Progression System

#### Leveling
- **Max Level**: 30
- **Hidden Abilities** (Năng Lực Tiềm Ẩn): 2 abilities
  - **Level 4**: Mở khóa ability thứ nhất
  - **Level 8**: Mở khóa ability thứ hai

#### Equipment
Mỗi hero có thể trang bị:
- **5 Trang Sức** (Accessories)
- **1 Bảo Cụ** (Legacy Item)

#### Skills
- **1 Kỹ Năng Cấp** (Base Skill) - Chỉ số tăng theo cấp sao
- **2 Kỹ Năng Thức Tỉnh** (Awakening Skills)

#### In-Battle Star System
Khi vào trận, hero nâng cấp tối đa **7 cấp độ** (4 cấp sao):

| Cấp Độ | Sao | Tên |
|--------|-----|-----|
| 1-2 | 1-2 ⭐ | Sao Đồng (Bronze) |
| 3-4 | 3-4 ⭐ | Sao Bạc (Silver) |
| 5-6 | 5-6 ⭐ | Sao Vàng (Gold) |
| 7 | 7 ⭐ | Sao Tím (Purple) |

**Hero Merge Mechanic**:
```
Same Hero + Same Level → Level Up
Example: Hero A (Lv1) + Hero A (Lv1) → Hero A (Lv2)
```

#### Combat Properties
Mỗi hero có các thuộc tính chiến đấu riêng:

- **Mobility**: Mobile (có thể di chuyển) hoặc Stationary (đứng yên)
- **Attack Range**: Phạm vi tấn công (số cells trên board 7×4)
- **Range Type**: Melee, Ranged, hoặc Mage
- **Movement Speed**: Tốc độ di chuyển (nếu mobile)
- **Movement Buffs**: Có skill buff tốc chạy hay không

## Cấu Trúc File JSON

### Template (Đầy Đủ)

```json
{
  "id": "hero_east_001",
  "name": "Hero Name",
  "nameVi": "Tên Anh Hùng",
  "region": "East",
  "regionVi": "Đông",
  "class": "Warrior",
  "classVi": "Chiến Binh",
  "rarity": "Legendary",
  "rarityVi": "Huyền Thoại",
  "maxLevel": 30,
  "baseStats": {
    "level": 1,
    "hp": 5000,
    "physicalAtk": 800,
    "magicAtk": 200,
    "def": 600,
    "attackSpeed": 120,
    "crit": 15,
    "critDmg": 150
  },
  "maxStats": {
    "level": 30,
    "hp": 50000,
    "physicalAtk": 8000,
    "magicAtk": 2000,
    "def": 6000,
    "attackSpeed": 150,
    "crit": 25,
    "critDmg": 200
  },
  "hiddenAbilities": [
    {
      "unlockLevel": 4,
      "name": "Hidden Power I",
      "nameVi": "Năng Lực Tiềm Ẩn I",
      "description": "Description of first hidden ability",
      "descriptionVi": "Mô tả năng lực tiềm ẩn thứ nhất"
    },
    {
      "unlockLevel": 8,
      "name": "Hidden Power II",
      "nameVi": "Năng Lực Tiềm Ẩn II",
      "description": "Description of second hidden ability",
      "descriptionVi": "Mô tả năng lực tiềm ẩn thứ hai"
    }
  ],
  "baseSkill": {
    "name": "Base Skill",
    "nameVi": "Kỹ Năng Cấp",
    "description": "Scales with star level",
    "descriptionVi": "Tăng cường theo cấp sao",
    "scaling": {
      "1star": { "multiplier": 1.0 },
      "2star": { "multiplier": 1.2 },
      "3star": { "multiplier": 1.5 },
      "4star": { "multiplier": 2.0 },
      "5star": { "multiplier": 2.5 },
      "6star": { "multiplier": 3.0 },
      "7star": { "multiplier": 4.0 }
    }
  },
  "awakeningSkills": [
    {
      "name": "Awakening Skill 1",
      "nameVi": "Kỹ Năng Thức Tỉnh 1",
      "type": "active",
      "description": "First awakening skill",
      "descriptionVi": "Kỹ năng thức tỉnh thứ nhất"
    },
    {
      "name": "Awakening Skill 2",
      "nameVi": "Kỹ Năng Thức Tỉnh 2",
      "type": "passive",
      "description": "Second awakening skill",
      "descriptionVi": "Kỹ năng thức tỉnh thứ hai"
    }
  ],
  "equipmentSlots": {
    "accessories": 5,
    "legacy": 1
  },
  "combatProperties": {
    "mobility": "mobile",
    "mobilityVi": "Di Chuyển Được",
    "attackRange": 3,
    "rangeType": "ranged",
    "rangeTypeVi": "Tầm Xa",
    "movementSpeed": 120,
    "movementSpeedBuff": false
  },
  "tierRankings": {
    "pve": "S",
    "pvp": "A",
    "boss": "S+",
    "arena": "A+"
  },
  "synergies": {
    "bestWith": ["hero_east_005", "hero_north_012"],
    "counters": ["hero_west_023"],
    "counteredBy": ["hero_south_008"]
  },
  "recommendedBuild": {
    "accessories": ["acc_001", "acc_002", "acc_003", "acc_004", "acc_005"],
    "legacy": "legacy_001",
    "altars": {
      "hero": 5,
      "blackSmith": 10,
      "blood": 0,
      "giant": 5,
      "mage": 5,
      "greed": 0
    },
    "relics": ["relic_summon_001", "relic_arena_005", "relic_corruption_003"],
    "riftEquipment": ["rift_spear", "rift_mask", "rift_orb", "rift_shield", "rift_short_sword", "rift_dual_swords"]
  }
}
```

## Danh Sách Heroes

### Region: East (Đông) - 13 Heroes
_Chờ cập nhật..._

### Region: West (Tây) - 12 Heroes
_Chờ cập nhật..._

### Region: South (Nam) - 14 Heroes
_Chờ cập nhật..._

### Region: North (Bắc) - 19 Heroes
_Chờ cập nhật..._

### Region: Central (Trung) - 12 Heroes
_Chờ cập nhật..._

## Tier Rankings

### S-Tier (PvE)
_Chờ cập nhật..._

### S-Tier (PvP)
_Chờ cập nhật..._

### A-Tier
_Chờ cập nhật..._

### B-Tier
_Chờ cập nhật..._

---

**Hướng Dẫn**: Thêm file JSON cho từng hero theo region (e.g., `east-hero-001.json`)
