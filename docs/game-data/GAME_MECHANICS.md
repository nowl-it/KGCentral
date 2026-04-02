# King God Castle - Cơ Chế Game (Reversed Data)

> Tài liệu này tổng hợp kiến thức từ việc reverse engineering game King God Castle.
> Nguồn: `data-reverse/` folder, phiên bản game **167.0.01**

---

## 1. Cấu Trúc Dữ Liệu Anh Hùng (Heroes / Units)

### 1.1 File nguồn
- **Chính**: `xml/Units.xml` - Chứa toàn bộ thông số hero
- **Localization**: `xml/Strings_{LANG}.xml` - Tên, mô tả theo ngôn ngữ

### 1.2 Phân biệt Hero vs Clone/Summon
- **Hero của người chơi**: ID trong khoảng `10000 - 19999`, `<Type>Player`
- **Clone/Phân thân**: Bỏ qua các comment có chữ 분신 (clone), 형태 (form), 스로프, 샤샤

### 1.3 Base Stats (Level 1, Tier 1)
Chỉ số trong XML **luôn là chỉ số GỐC ở Level 1, Bậc 1 (1 Sao)**:

| Tag | Ý nghĩa | Ví dụ |
|-----|---------|-------|
| `<Hp>` | Máu gốc | 150 |
| `<Mana>` | Năng lượng tối đa | 75 |
| `<BattleStartMana>` | Mana lúc bắt đầu trận | 75 |
| `<Atk>` | Công vật lý (ATK) | 15 |
| `<MAtk>` | Công phép (Spell Power) | 15 |
| `<AttackInterval>` | Thời gian giữa các đòn đánh (giây) | 1.0 |
| `<RangeType>` | Loại tầm đánh | Sum, Cross |
| `<RangeSum>` | Số ô tầm đánh | 1-5 |

---

## 2. Hệ Thống Nâng Cấp

### 2.1 Potentials (Năng Lực Tiềm Ẩn) - Level 4, 8, 16

Các mốc unlock quan trọng nằm trong tag `<Potential>`:

```xml
<Potential ReqLevel='4'>
    <DescComment>Trao 1 lần phòng thủ tuyệt đối</DescComment>
    <SetSuperShield>1</SetSuperShield>
</Potential>
<Potential ReqLevel='8'>
    <DescComment>Buff thêm 2 giây</DescComment>
    <BuffDuration>2</BuffDuration>
</Potential>
<Potential ReqLevel='16' Tier='1'>
    <!-- Awakening option 1 -->
</Potential>
<Potential ReqLevel='16' Tier='1' Slot='2'>
    <!-- Awakening option 2 -->
</Potential>
```

**Cấp 4 & 8**: Buff cứng hoặc thay đổi kỹ năng
**Cấp 16**: Chọn 1 trong 2 Giác ngộ (Awakening)

### 2.2 Công Thức Tăng Chỉ Số Theo Level (Reversed từ IL2CPP)

> **Hàm:** `ResourceUnit$$GetCardLevelValueDouble(baseStat, level)`
> **Địa chỉ:** Tìm qua XREF từ `CardInfoPanel$$MappingStat`

**Thuật toán:** Vòng lặp cộng dồn % multiplier

```python
def calculate_stat_multiplier(level: int) -> float:
    multiplier = 1.0
    for lvl in range(2, level + 1):
        if lvl == 4 or lvl == 8:
            multiplier += 0.5  # Potential unlock bonus
        elif 16 <= lvl <= 20:
            multiplier += 0.3  # Awaken phase
        elif 21 <= lvl <= 25:
            multiplier += 0.1  # Diminishing returns
        elif lvl == 26:
            multiplier += 0.2  # Final breakthrough
        elif lvl >= 27:
            multiplier += 0.1  # Saturation
        else:
            multiplier += 0.2  # Normal
    return round(multiplier, 5)

# Stat = round(BaseStat × Multiplier + 0.5)  # Round Half-Up
```

**Bảng tỷ lệ tăng trưởng:**

| Level | % tăng | Multiplier | Ghi chú |
|-------|--------|------------|---------|
| 1 | - | 1.0x | Base |
| 2-3 | +20%/lvl | 1.2-1.4x | |
| 4 | +50% | 1.9x | ⭐ Potential 1 |
| 5-7 | +20%/lvl | 2.1-2.5x | |
| 8 | +50% | 3.0x | ⭐ Potential 2 |
| 9-15 | +20%/lvl | 3.2-4.4x | |
| 16 | +30% | 4.7x | ⭐ Awakening |
| 17-20 | +30%/lvl | 5.0-5.9x | |
| 21-25 | +10%/lvl | 6.0-6.4x | Diminishing |
| 26 | +20% | 6.6x | Breakthrough |
| 27-30 | +10%/lvl | 6.7-7.0x | Saturation |

**Ví dụ Shelda (HP=220, ATK=15, MATK=50):**

| Level | Multiplier | HP | ATK | MATK |
|-------|------------|-----|-----|------|
| 1 | 1.0x | 220 | 15 | 50 |
| 4 | 1.9x | 418 | 29 | 95 |
| 8 | 3.0x | 660 | 45 | 150 |
| 16 | 4.7x | 1034 | 71 | 235 |

**Lưu ý quan trọng:**
- **Tốc đánh & Tốc chạy KHÔNG scale** theo level
- **Mana KHÔNG scale** theo level
- Phải dùng `round(multiplier, 5)` để tránh Float Precision Error
- Game dùng Round Half-Up: `int(value + 0.5)`

### 2.3 In-Game Tiers (1-7 Sao)

Khi merge 2 hero giống nhau → tăng tier, stats nhân với hệ số:

- Tham chiếu qua `<LevelRatio Level='X'>` trong XML
- Code C#: `Dictionary<int, double> levelRatio` trong class `ResourceUnit`

---

## 3. Hệ Thống Localization

### 3.1 Files ngôn ngữ
- `Strings_VI.xml` - Tiếng Việt
- `Strings_EN.xml` - Tiếng Anh
- `Strings_KO.xml` - Tiếng Hàn
- `Strings_JA.xml` - Tiếng Nhật
- ... và nhiều ngôn ngữ khác

### 3.2 Key mapping

| Loại | Pattern | Ví dụ |
|------|---------|-------|
| Tên hero | `UnitName_{ID}` | `UnitName_10040` → "Luniare" |
| Tên thật | `UnitRealName_{ID}` | |
| Tiểu sử | `SkinDesc_Default_{ID}` | |
| Tên kỹ năng | `SkillName_{SkillID}` | `SkillName_10040` |
| Mô tả ngắn | `SkillDesc_{SkillID}` | |
| Mô tả chi tiết | `SkillDesc_{SkillID}_Long` | |
| Passive Lv4 | `Potential_{HeroID}_0` | `Potential_10040_0` |
| Passive Lv8 | `Potential_{HeroID}_1` | `Potential_10040_1` |
| Awakening 1 tên | `Name_Potential_{HeroID}_2` | |
| Awakening 1 mô tả | `Potential_{HeroID}_2` | |
| Awakening 2 tên | `Name_Potential_{HeroID}_3` | |
| Awakening 2 mô tả | `Potential_{HeroID}_3` | |

---

## 4. Classes (Vai Trò)

| Class | Tên Việt | Vai trò |
|-------|----------|---------|
| Tenacity | Kiên Cường | Tank - Chịu đòn, bảo vệ |
| Courage | Dũng Mãnh | Fighter - Cận chiến linh hoạt |
| Swiftness | Mẫn Tiệp | Archer - Sát thương tầm xa |
| Elemental | Nguyên Tố | Mage - Phép thuật, AOE |
| Shadow | Bóng Tối | Assassin - Burst, xuyên hàng |
| Mystique | Huyền Bí | Support - Buff, heal |

---

## 5. Regions (Vùng Miền)

| Region | Tên Việt | Số hero |
|--------|----------|---------|
| North | Bắc | 20 |
| South | Nam | 15 |
| East | Đông | 13 |
| West | Tây | 12 |
| Central | Trung Tâm | 12 |

**Synergy**: Team nhiều hero cùng vùng → +5 level Tế Đàn vùng đó

---

## 6. Altars (Tế Đàn)

| Altar | Hiệu ứng |
|-------|----------|
| Hero Altar | +% tỉ lệ lên tier hero |
| Blacksmith Altar | +% tỉ lệ lên tier equipment |
| Blood Altar | +HP cho toàn team |
| Giant Altar | +ATK (công vật lý) |
| Mage Altar | +MATK (công phép) |
| Greed Altar | +Gold thu được |

**Điểm Altar tối đa**: 25 điểm / team

---

## 7. Equipment Types

| Type | Tên Việt |
|------|----------|
| Sword | Kiếm |
| Armor | Giáp |
| Bow | Cung |
| Staff | Trượng |
| Rune | Rune |
| GodItem | Thần Khí |

---

## 8. Parser Script

File `data-reverse/parse_game_data.py` là script Python chuẩn để:
1. Rà quét toàn bộ `/xml/`
2. Lọc bỏ Clone/Summon
3. Đối chiếu Localization
4. Trích xuất Potentials & Awakenings
5. Export JSON ra `/docs/game-data/`

**Output**: 
- `docs/game-data/heroes/all-heroes.json` (72 heroes)
- `docs/game-data/equipment/all-equipment.json` (273 items)
- `docs/game-data/altars/all-altars.json` (15 altars)
- `docs/game-data/relics/all-relics.json` (318 relics)
- `docs/game-data/synergies/all-synergies.json` (62 synergies)

---

## 9. Giới Hạn Dữ Liệu Hiện Tại

### ✅ Có trong data/đã reverse:
- Base stats (Level 1, Tier 1)
- **Công thức stat scaling theo level** (đã reverse từ IL2CPP)
- Skill descriptions
- Passives (Level 4, 8)
- Awakenings (Level 16)
- Equipment stats
- Altar effects
- Region synergies

### ❌ Chưa reverse:
- **Tier scaling multipliers** (in-game 1-7 sao)
- **Exact skill damage values by tier** (calculated runtime)
- Battle damage formulas
- Equipment merge formulas

---

**Last Updated**: 2026-03-29  
**Game Version**: 167.0.01  
**Source**: `data-reverse/` folder
