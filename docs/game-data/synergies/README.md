# Team Synergies & Meta Compositions

Tài liệu về **Synergy** và **Đội Hình Meta** trong King God Castle.

## Team Structure (Cấu Trúc Đội Hình)

### Quy Tắc Team
- **Max Teams**: 10 đội (10 binh lực)
- **Mỗi Team gồm**:
  - **6 Heroes** (Anh Hùng)
  - **25 Altar Points** (Điểm Tế Đàn)
  - **3 Relics** (Cổ Vật)
  - **6 Rift Equipment** (Trang Bị Khe Nứt)

## Hero Synergies

### Region-Based Synergies
Heroes từ cùng một miền (region) có thể có synergy đặc biệt:

- **East** (Đông) - 13 heroes
- **West** (Tây) - 12 heroes
- **South** (Nam) - 14 heroes
- **North** (Bắc) - 19 heroes
- **Central** (Trung) - 12 heroes

_Chờ cập nhật chi tiết về region bonuses..._

### Class-Based Synergies

_Chờ cập nhật về class synergies (Warrior, Mage, Ranger, etc.)..._

## Altar Builds cho Meta Teams

### Build 1: Balanced Team (Cân Bằng)
```json
{
  "buildName": "Balanced",
  "buildNameVi": "Cân Bằng",
  "altarDistribution": {
    "hero": 5,
    "blackSmith": 5,
    "blood": 5,
    "giant": 5,
    "mage": 5,
    "greed": 0
  },
  "total": 25,
  "recommendedFor": ["General PvE", "Mixed Content"],
  "recommendedForVi": ["PvE Chung", "Nội Dung Hỗn Hợp"]
}
```

### Build 2: Full DPS (Tấn Công Toàn Diện)
```json
{
  "buildName": "Full DPS",
  "buildNameVi": "Tấn Công Toàn Diện",
  "altarDistribution": {
    "hero": 0,
    "blackSmith": 10,
    "blood": 15,
    "giant": 0,
    "mage": 0,
    "greed": 0
  },
  "total": 25,
  "recommendedFor": ["Speed Farming", "Boss Burst"],
  "recommendedForVi": ["Farm Nhanh", "Bùng Nổ Boss"],
  "strengths": "Max damage, high lifesteal, absolute defense charges",
  "strengthsVi": "Sát thương tối đa, hút máu cao, lượt phòng thủ tuyệt đối",
  "weaknesses": "Low defense, no gold generation",
  "weaknessesVi": "Phòng thủ thấp, không tạo gold"
}
```

### Build 3: Tank/Sustain (Phòng Thủ)
```json
{
  "buildName": "Tank Focus",
  "buildNameVi": "Tập Trung Tank",
  "altarDistribution": {
    "hero": 5,
    "blackSmith": 0,
    "blood": 5,
    "giant": 15,
    "mage": 0,
    "greed": 0
  },
  "total": 25,
  "recommendedFor": ["Hard Content", "Survival"],
  "recommendedForVi": ["Nội Dung Khó", "Sinh Tồn"],
  "strengths": "High HP, damage reflection, sustain",
  "strengthsVi": "Máu cao, phản sát thương, hồi phục",
  "weaknesses": "Low damage output",
  "weaknessesVi": "Sát thương thấp"
}
```

### Build 4: Mage Team (Đội Pháp Sư)
```json
{
  "buildName": "Mage Focus",
  "buildNameVi": "Tập Trung Phép",
  "altarDistribution": {
    "hero": 5,
    "blackSmith": 0,
    "blood": 5,
    "giant": 0,
    "mage": 15,
    "greed": 0
  },
  "total": 25,
  "recommendedFor": ["Magic Teams", "Spell Spam"],
  "recommendedForVi": ["Đội Phép", "Spam Kỹ Năng"],
  "strengths": "High mana, magic power, mana on kill",
  "strengthsVi": "Mana cao, sức mạnh phép, mana khi tiêu diệt",
  "weaknesses": "Squishy, mana-dependent",
  "weaknessesVi": "Dễ chết, phụ thuộc mana"
}
```

### Build 5: Economic/Greed (Kinh Tế)
```json
{
  "buildName": "Greed Build",
  "buildNameVi": "Build Tham Vọng",
  "altarDistribution": {
    "hero": 5,
    "blackSmith": 5,
    "blood": 0,
    "giant": 0,
    "mage": 0,
    "greed": 15
  },
  "total": 25,
  "recommendedFor": ["Early Game", "Economy Snowball"],
  "recommendedForVi": ["Đầu Game", "Phát Triển Kinh Tế"],
  "strengths": "Max starting gold, merchant discounts, elite wave bonuses",
  "strengthsVi": "Gold khởi đầu tối đa, giảm giá cửa hàng, bonus vòng tinh nhuệ",
  "weaknesses": "No combat bonuses",
  "weaknessesVi": "Không có bonus chiến đấu"
}
```

## Meta Team Compositions

### Example Team 1: Physical DPS Team

```json
{
  "teamName": "Physical Powerhouse",
  "teamNameVi": "Đội Vật Lý Mạnh Mẽ",
  "gameMode": "PvE",
  "tier": "S",
  "heroes": [
    { "id": "hero_east_001", "region": "East", "role": "Main DPS" },
    { "id": "hero_north_005", "region": "North", "role": "Sub DPS" },
    { "id": "hero_west_003", "region": "West", "role": "Tank" },
    { "id": "hero_south_007", "region": "South", "role": "Support" },
    { "id": "hero_central_002", "region": "Central", "role": "Buffer" },
    { "id": "hero_east_009", "region": "East", "role": "Flex DPS" }
  ],
  "altarBuild": {
    "hero": 0,
    "blackSmith": 10,
    "blood": 15,
    "giant": 0,
    "mage": 0,
    "greed": 0
  },
  "relics": [
    { "id": "relic_corruption_001", "type": "Corruption" },
    { "id": "relic_arena_005", "type": "Arena" },
    { "id": "relic_special_002", "type": "Special" }
  ],
  "riftEquipment": [
    { "type": "Spear", "focus": "Physical ATK" },
    { "type": "Dual Swords", "focus": "Attack Speed" },
    { "type": "Shield", "focus": "DEF + ATK" },
    { "type": "Short Sword", "focus": "Balanced" },
    { "type": "Mask", "focus": "HP" },
    { "type": "Orb", "focus": "Crit" }
  ],
  "synergies": [
    "High physical damage output",
    "Lifesteal sustain from Blood Altar",
    "Equipment upgrade from Black Smith",
    "Absolute defense charges for survival"
  ],
  "synergiesVi": [
    "Sát thương vật lý cao",
    "Hồi phục từ hút máu (Blood Altar)",
    "Nâng cấp trang bị từ Thợ Rèn",
    "Lượt phòng thủ tuyệt đối để sinh tồn"
  ],
  "strengths": "Extremely high DPS, good sustain, scales well with equipment",
  "strengthsVi": "DPS cực cao, hồi phục tốt, scale tốt với trang bị",
  "weaknesses": "Vulnerable to burst damage before lifesteal kicks in",
  "weaknessesVi": "Dễ bị sát thương bùng nổ trước khi hút máu kích hoạt"
}
```

### Example Team 2: Magic Team

```json
{
  "teamName": "Arcane Dominators",
  "teamNameVi": "Đội Phép Thống Trị",
  "gameMode": "Boss",
  "tier": "S+",
  "heroes": [
    { "id": "hero_west_001", "region": "West", "role": "Main Mage" },
    { "id": "hero_central_005", "region": "Central", "role": "Sub Mage" },
    { "id": "hero_north_012", "region": "North", "role": "Tank" },
    { "id": "hero_south_004", "region": "South", "role": "Mana Support" },
    { "id": "hero_east_008", "region": "East", "role": "Debuffer" },
    { "id": "hero_west_010", "region": "West", "role": "Flex Mage" }
  ],
  "altarBuild": {
    "hero": 5,
    "blackSmith": 0,
    "blood": 5,
    "giant": 0,
    "mage": 15,
    "greed": 0
  },
  "relics": [
    { "id": "relic_summon_001", "type": "Summon Chest" },
    { "id": "relic_corruption_009", "type": "Corruption" },
    { "id": "relic_special_004", "type": "Special" }
  ],
  "riftEquipment": [
    { "type": "Orb", "focus": "Magic ATK" },
    { "type": "Mask", "focus": "Magic Penetration" },
    { "type": "Short Sword", "focus": "Mana Regen" },
    { "type": "Spear", "focus": "Spell Amp" },
    { "type": "Shield", "focus": "Defense" },
    { "type": "Dual Swords", "focus": "Cast Speed" }
  ],
  "synergies": [
    "Max mana at start (75%)",
    "99% mana on kill - infinite spell spam",
    "+5% total magic power",
    "Lifesteal for sustain"
  ],
  "synergiesVi": [
    "Mana tối đa lúc bắt đầu (75%)",
    "99% mana khi tiêu diệt - spam kỹ năng vô hạn",
    "+5% tổng sức mạnh phép",
    "Hút máu để hồi phục"
  ],
  "strengths": "Infinite mana sustain, high spell damage, mana on kill snowball",
  "strengthsVi": "Mana vô hạn, sát thương phép cao, snowball từ mana on kill",
  "weaknesses": "Requires kills to maintain mana momentum",
  "weaknessesVi": "Cần tiêu diệt để duy trì momentum mana"
}
```

## Synergy Scoring Factors

Khi AI tính toán synergy score, cần xem xét:

1. **Hero Synergies**
   - Region bonuses
   - Class combinations
   - Skill interactions
   - Star level scaling

2. **Altar Distribution**
   - Matching altar build with team playstyle
   - Efficient point allocation (total = 25)
   - Synergy between altar effects

3. **Relic Combinations**
   - 3 relics per team
   - Stats distribution matching hero needs
   - Type synergies (Summon/Corruption/Arena/Special)

4. **Rift Equipment**
   - 6 pieces per team
   - Main stats matching DPS/Tank/Mage roles
   - Sub stats complementing team weaknesses

5. **Game Mode Context**
   - PvE vs PvP vs Boss
   - Early game vs late game
   - Speed farming vs progression

---

**Last Updated**: 2026-03-28  
**Hướng Dẫn**: Thêm các meta compositions chi tiết theo game mode và patch version
