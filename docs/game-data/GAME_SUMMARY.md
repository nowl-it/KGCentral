# King God Castle - Game Data Summary

Tóm tắt toàn bộ hệ thống game cho **AI Training** và **Wiki Content**.

**Last Updated**: 2026-03-28  
**Game Version**: Current

---

## 📊 Thống Kê Tổng Quan

| Hạng Mục | Số Lượng |
|----------|----------|
| **Battle Board Size** | 7×4 (28 cells) |
| **Max Teams** | 10 đội (binh lực) |
| **Heroes per Team** | 6 |
| **Total Heroes** | 70 (5 regions) |
| **Altar Points per Team** | 25 |
| **Altar Types** | 6 |
| **Relics per Team** | 3 |
| **Total Relics** | 49 (4 types) |
| **Rift Equipment per Team** | 6 |
| **Rift Equipment Types** | 6 |
| **Accessories per Hero** | 5 |
| **Legacy per Hero** | 1 |

---

## ⚔️ Battle System

### Battle Board (Bàn Cờ Chiến Đấu)

Khi bắt đầu trận đấu, heroes được xếp trên **bàn cờ 7×4**:

```
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│     │     │     │     │     │     │     │  Row 1
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │     │     │     │     │     │  Row 2
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │     │     │     │     │     │  Row 3
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │     │     │     │     │     │  Row 4
└─────┴─────┴─────┴─────┴─────┴─────┴─────┘
    7 columns × 4 rows = 28 total cells
```

**Key Points**:
- **Grid Size**: 7 columns × 4 rows (28 cells total)
- **Heroes**: 6 heroes per team placed on board
- **Free Placement**: Heroes có thể đặt ở **bất kỳ ô nào**
- **Stacking**: Heroes chồng lên nhau = merge (nâng cấp) hoặc replace (thay thế)

### Hero Stacking Mechanics

**Merge (Nâng Cấp)**:
```
Same Hero + Same Level → Upgraded Hero (+1 level)
Example: Hero A Lv1 + Hero A Lv1 → Hero A Lv2
```

**Replace (Thay Thế)**:
```
Different Hero OR Different Level → New Hero replaces Old Hero
Example: Hero A + Hero B → Hero B replaces Hero A
```

### Movement & Combat

**Movement**:
- Một số heroes **có thể di chuyển** (mobile)
- Một số heroes **không di chuyển** (stationary)
- Heroes di chuyển tới trong **phạm vi tấn công** rồi attack
- Có skill **buff tốc chạy** (movement speed buffs)

**Attack Range**:
- Mỗi hero có **phạm vi** (range), **khoảng cách** (distance), **chiêu thức** (skills) riêng
- **Melee**: Range ngắn (1-2 cells)
- **Ranged**: Range trung bình (3-5 cells)
- **Mage**: Range xa (4-6 cells), AoE

**Strategy**:
- Người chơi **tự do sắp xếp** heroes theo chiến thuật
- Positioning ảnh hưởng combat effectiveness
- Formation matters (Tank front, DPS mid, Support back)

---

## 🎯 Team Composition (Đội Hình)

Mỗi đội (binh lực) bao gồm:

```
1 Team = 6 Heroes + 25 Altar Points + 3 Relics + 6 Rift Equipment
```

### Max Teams
- **10 đội** có thể được tạo
- Mỗi đội có cấu hình riêng biệt

---

## 🦸 Heroes System (70 Total)

### Phân Bổ Theo Miền

| Miền | Số Lượng |
|------|----------|
| Đông (East) | 13 |
| Tây (West) | 12 |
| Nam (South) | 14 |
| Bắc (North) | 19 |
| Trung (Central) | 12 |

### Hero Progression

| Hệ Thống | Chi Tiết |
|----------|----------|
| **Max Level** | 30 |
| **Hidden Abilities** | 2 (unlock tại level 4 và 8) |
| **Skills** | 1 base skill + 2 awakening skills |
| **Equipment Slots** | 5 accessories + 1 legacy |
| **In-Battle Stars** | 7 levels → 4 star tiers |

### Star System (In-Battle)

| Cấp Độ | Sao | Loại |
|--------|-----|------|
| 1-2 | 1-2 ⭐ | Sao Đồng (Bronze) |
| 3-4 | 3-4 ⭐ | Sao Bạc (Silver) |
| 5-6 | 5-6 ⭐ | Sao Vàng (Gold) |
| 7 | 7 ⭐ | Sao Tím (Purple) |

**Note**: Mỗi cấp sao tăng chỉ số của kỹ năng cấp (base skill)

---

## 🏛️ Altar System (25 Points Total)

### 6 Loại Altars

| ID | Tên | Max Level | Milestone Levels |
|----|-----|-----------|------------------|
| 1 | Hero (Anh Hùng) | 15 | 1, 5, 10, 15 |
| 2 | Black Smith (Thợ Rèn) | 15 | 1, 5, 10, 15 |
| 3 | Blood (Máu) | 15 | 1, 5, 10, 15 |
| 4 | Giant (Cự Thần) | 15 | 1, 5, 10, 15 |
| 5 | Mage (Pháp Sư) | 15 | 1, 5, 10, 15 |
| 6 | Greed (Tham Vọng) | 15 | 1, 5, 10, 15 |

### Quy Tắc
- Tổng cộng **25 points** để phân bổ
- Hiệu ứng kích hoạt mỗi **5 cấp độ**
- Mỗi altar có thể lên tối đa **level 15**

### Quick Reference - Altar Effects at Max Level (15)

| Altar | Level 15 Key Effects |
|-------|----------------------|
| **Hero** | 15% summon upgrade, 15% merge upgrade, Power Book Lv.2 |
| **Black Smith** | 30% forge upgrade, Forge Tier 3, 2 reappraisals |
| **Blood** | 30% lifesteal, +5% total ATK, 3x absolute defense |
| **Giant** | +225 DEF, +5% HP, 20% damage reflect (magic: half) |
| **Mage** | 75% starting mana, +5% magic power, 99% mana on kill |
| **Greed** | +18 starting gold, +15 elite wave gold, 40% merchant discount |

---

## 🗿 Relic System (49 Total)

### 4 Loại Relics

| Loại | Số Lượng |
|------|----------|
| Rương Triệu Hồi (Summon Chest) | 13 |
| Xâm Thực (Corruption) | 14 |
| Đấu Trường (Arena) | 16 |
| Đặc Biệt (Special) | 6 |

### Relic Properties
- **Max Upgrade**: 4 levels
- **Stats Grid**: 4 rows × 6 columns
- **4 Main Stats**: Physical ATK, HP, Attack Speed, Magic ATK

---

## ⚔️ Equipment System

### Hero Equipment
- **5 Accessories** per hero
- **1 Legacy** per hero

### Rift Equipment (6 per Team)

#### 6 Types + Crafting Recipes

| Tên | Công Thức |
|-----|-----------|
| Thương Dài (Spear) | Thần Giáp + Thần Cung |
| Mặt Nạ (Mask) | Thần Giáp + Thần Trượng |
| Quả Cầu (Orb) | Thần Cung + Thần Trượng |
| Khiên (Shield) | Thần Kiếm + Thần Giáp |
| Đoản Kiếm (Short Sword) | Thần Kiếm + Thần Trượng |
| Song Kiếm (Dual Swords) | Thần Kiếm + Thần Cung |

#### Rift Crystal Processing
- **Sản Xuất** (Craft): 2 base equipment → 1 rift equipment
- **Phân Hủy** (Dissolve): 1 crystal (destroyed) → 1 random rift equipment
- **Thanh Tẩy** (Purify): 1 crystal (destroyed) → 2 random rift equipment

#### Rift Equipment Stats
- **2 Main Stats** (chỉ số chủ lực)
- **3 Sub Stats** (chỉ số bổ trợ)
- **Max Upgrade**: 4 levels

---

## 📈 Synergy Factors for AI

Khi tính toán synergy score, AI cần cân nhắc:

### 1. Hero Selection (6/70)
- Region distribution
- Class balance
- Skill synergies
- Star scaling potential

### 2. Altar Build (25 points)
- Matching team strategy (DPS/Tank/Mage/Economic)
- Efficient point allocation
- Synergy between altar types

### 3. Relic Selection (3/49)
- Type distribution (Summon/Corruption/Arena/Special)
- Stats matching hero needs
- Upgrade priority

### 4. Rift Equipment (6 pieces)
- Type selection (Spear/Mask/Orb/Shield/Short Sword/Dual Swords)
- Main stats alignment
- Sub stats optimization

### 5. Game Mode Context
- **PvE**: Sustain, hero upgrades, gold generation
- **PvP**: Burst damage, survivability, star scaling
- **Boss**: Max DPS, lifesteal, mana sustain
- **Arena**: Balanced stats, quick snowball

---

## 🎮 Common Meta Builds

### Build Archetypes

| Build | Altar Distribution | Use Case |
|-------|-------------------|----------|
| **Balanced** | 5/5/5/5/5/0 | General content |
| **Full DPS** | 0/10/15/0/0/0 | Speed farming |
| **Tank** | 5/0/5/15/0/0 | Hard content |
| **Mage** | 5/0/5/0/15/0 | Magic teams |
| **Greed** | 5/5/0/0/0/15 | Early economy |

---

## 🧮 Calculation Formulas

### Team Power Score (Example)
```
Total Power = 
  (Hero Power × 6) +
  (Altar Effects Score) +
  (Relic Stats × 3) +
  (Rift Equipment Stats × 6) +
  (Synergy Multiplier)
```

### Synergy Multiplier Factors
1. **Hero Region Match**: +5% per matching region pair
2. **Hero Class Balance**: +10% if all 3 main roles covered (Tank/DPS/Support)
3. **Altar-Hero Match**: +15% if altar build matches hero types
4. **Relic-Hero Match**: +10% if relic stats match hero main stats
5. **Equipment-Hero Match**: +10% if rift equipment main stats align

**Max Synergy Bonus**: ~50% (perfect synergy)

---

## 📝 Data Completeness Status

| Category | Status | Files Needed |
|----------|--------|--------------|
| Heroes | 🔴 0% | 70 hero JSON files |
| Altars | 🟢 100% | Structure documented |
| Relics | 🟡 20% | Need 49 relic JSON files |
| Rift Equipment | 🟡 50% | Need 6 equipment templates |
| Synergies | 🟡 30% | Need meta compositions |
| Mechanics | 🟢 90% | Core systems documented |

---

## 🎯 AI Training Priorities

### Phase 1: Core Data (High Priority)
1. ✅ Altar system (COMPLETE)
2. ✅ Rift equipment types and crafting (COMPLETE)
3. ✅ Team composition rules (COMPLETE)
4. 🔲 Hero data (70 heroes) - **CRITICAL**
5. 🔲 Relic data (49 relics) - **CRITICAL**

### Phase 2: Synergy Modeling (Medium Priority)
6. 🔲 Region-based hero synergies
7. 🔲 Class-based synergies
8. 🔲 Skill interaction data
9. 🔲 Altar build archetypes

### Phase 3: Meta & Strategy (Low Priority)
10. 🔲 Meta team compositions per game mode
11. 🔲 Counter strategies
12. 🔲 Progression guides
13. 🔲 Build recommendations per hero

---

## 📚 File Structure Reference

```
docs/game-data/
├── heroes/           # 70 heroes (5 regions)
│   ├── README.md     # ✅ Structure documented
│   ├── east/         # 13 heroes
│   ├── west/         # 12 heroes
│   ├── south/        # 14 heroes
│   ├── north/        # 19 heroes
│   └── central/      # 12 heroes
│
├── altars/           # 6 altar types
│   └── README.md     # ✅ All effects documented
│
├── relics/           # 49 relics (4 types)
│   ├── README.md     # ✅ Structure documented
│   ├── summon/       # 13 relics
│   ├── corruption/   # 14 relics
│   ├── arena/        # 16 relics
│   └── special/      # 6 relics
│
├── equipment/        # 3 types
│   ├── README.md     # ✅ Structure documented
│   ├── accessories/  # Per-hero equipment
│   ├── legacy/       # Per-hero unique
│   └── rift/         # 6 team equipment types
│
├── mechanics/        # Game systems
│   └── README.md     # ✅ Core mechanics documented
│
└── synergies/        # Meta compositions
    └── README.md     # ✅ Framework documented
```

---

**Contributors**: KGCentral Team  
**For**: AI Service Training & Wiki Content Generation
