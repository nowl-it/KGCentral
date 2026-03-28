# Game Mechanics

Tài liệu về **Cơ Chế Game** (Game Mechanics) của King God Castle.

## Battle Board (Bàn Cờ Chiến Đấu)

### Grid Layout
Khi bắt đầu trận đấu, có một **bàn cờ 7×4**:

```
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │  5  │  6  │  7  │  Row 1
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│  8  │  9  │ 10  │ 11  │ 12  │ 13  │ 14  │  Row 2
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│ 15  │ 16  │ 17  │ 18  │ 19  │ 20  │ 21  │  Row 3
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│ 22  │ 23  │ 24  │ 25  │ 26  │ 27  │ 28  │  Row 4
└─────┴─────┴─────┴─────┴─────┴─────┴─────┘
```

- **Tổng số ô**: 28 (7 columns × 4 rows)
- **Heroes per team**: 6 anh hùng
- **Positioning**: Vị trí heroes trên board ảnh hưởng đến chiến thuật

### Hero Placement Rules

#### Đặt Hero
- **Vị trí tự do**: Heroes có thể đặt ở **bất kỳ ô nào** trên board (28 cells)
- **Không giới hạn**: Không có ràng buộc front/back line cố định
- **Player control**: Người chơi tự do sắp xếp theo chiến thuật

#### Chồng Heroes (Stacking)
Khi đặt hero lên ô đã có hero:

**Case 1: Hero Merge (Nâng Cấp)**
```
Điều kiện: Cùng hero + Cùng cấp độ
Hero A (Level 1) + Hero A (Level 1) → Hero A (Level 2)
Hero A (Level 2) + Hero A (Level 2) → Hero A (Level 3)
...
```
- Heroes phải **cùng loại** (same hero ID)
- Heroes phải **cùng cấp độ** (same level/star)
- Kết quả: Hero **nâng lên 1 cấp**

**Case 2: Hero Replacement (Thay Thế)**
```
Điều kiện: Khác hero HOẶC khác cấp độ
Hero A (Level 1) + Hero B (Level 1) → Hero B thay thế Hero A
Hero A (Level 1) + Hero A (Level 2) → Hero A Lv2 thay thế Hero A Lv1
```
- Hero mới **thay thế** hero cũ tại vị trí đó
- Hero cũ bị loại bỏ khỏi board

### Movement System

#### Hero Mobility
Heroes có 2 loại mobility:

1. **Mobile Heroes** (Có thể di chuyển)
   - Di chuyển trên grid tới vị trí địch
   - Tìm vị trí trong **phạm vi tấn công**
   - Sau đó **tấn công địch**

2. **Stationary Heroes** (Không di chuyển)
   - Đứng yên tại vị trí ban đầu
   - Chỉ tấn công trong phạm vi tĩnh

#### Movement Speed
- Mỗi hero có **speed stat** riêng
- Một số heroes có **buff tốc chạy** (movement speed buffs)
- Speed buffs tăng khả năng di chuyển và positioning

### Combat Mechanics

#### Attack Range
Mỗi hero có các thuộc tính riêng:

| Thuộc Tính | Mô Tả |
|------------|-------|
| **Phạm Vi** (Range) | Khoảng cách tấn công (số cells) |
| **Khoảng Cách** (Distance) | Tầm xa/gần (melee/ranged) |
| **Chiêu Thức** (Skills) | Kỹ năng unique cho mỗi hero |

**Example**:
- **Melee Heroes**: Range 1-2 cells, phải đến gần
- **Ranged Heroes**: Range 3-5 cells, tấn công từ xa
- **Mage Heroes**: Range 4-6 cells, AoE skills

#### Combat Flow
```
1. Hero Placement (Đặt 6 heroes trên board)
   ↓
2. Battle Start (Bắt đầu trận đấu)
   ↓
3. Movement Phase (Heroes di chuyển nếu có)
   ↓
4. Attack Phase (Heroes tấn công trong phạm vi)
   ↓
5. Skill Activation (Kỹ năng kích hoạt)
   ↓
6. Repeat until victory/defeat
```

### Strategic Positioning

#### Formation Examples

**Formation 1: Tank Front (3-2-1)**
```
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│     │     │  T  │  T  │  T  │     │     │  Row 1 (Front)
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │  D  │  D  │     │     │     │  Row 2 (Mid)
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │     │  S  │     │     │     │  Row 3 (Back)
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │     │     │     │     │     │  Row 4 (Reserve)
└─────┴─────┴─────┴─────┴─────┴─────┴─────┘
T = Tank, D = DPS, S = Support
```

**Formation 2: Spread DPS (2-2-2)**
```
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│     │  T  │     │     │     │  T  │     │  Row 1
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │  D  │     │  D  │     │     │  Row 2
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │     │  S  │     │     │     │  Row 3
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │     │  S  │     │     │     │  Row 4
└─────┴─────┴─────┴─────┴─────┴─────┴─────┘
```

**Formation 3: Ranged Back (1-1-2-2)**
```
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│     │     │     │  T  │     │     │     │  Row 1
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │     │  D  │     │     │     │  Row 2
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │  R  │     │  R  │     │     │  Row 3
├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│     │     │  M  │     │  M  │     │     │  Row 4
└─────┴─────┴─────┴─────┴─────┴─────┴─────┘
R = Ranged DPS, M = Mage
```

### Key Strategic Factors

1. **Tank Positioning**
   - Front rows (1-2) để absorb damage
   - Protect backline DPS/Support

2. **DPS Positioning**
   - Middle rows (2-3) cho balanced approach
   - Consider hero range khi đặt vị trí

3. **Support/Healer Positioning**
   - Back rows (3-4) để an toàn
   - Trong phạm vi heal/buff allies

4. **Mobile Heroes**
   - Có thể đặt anywhere
   - Di chuyển tới optimal attack positions

5. **Range Considerations**
   - Melee: cần gần front
   - Ranged: có thể ở back
   - Mage: tùy theo AoE skills

## Team Composition (Binh Lực)

### Quy tắc đội hình
- **Số đội tối đa**: 10 đội (10 binh lực)
- **Mỗi đội bao gồm**:
  - **6 Anh Hùng** (Heroes)
  - **25 Điểm Tế Đàn** (Altar Points)
  - **3 Cổ Vật** (Relics)
  - **6 Trang Bị Khe Nứt** (Rift Equipment)

## Hero System

### Regions (Miền)
Anh hùng được chia thành 5 miền:

| Miền | Số lượng Anh Hùng |
|------|-------------------|
| **Đông** (East) | 13 |
| **Tây** (West) | 12 |
| **Nam** (South) | 14 |
| **Bắc** (North) | 19 |
| **Trung** (Central) | 12 |
| **Tổng cộng** | **70** |

### Hero Progression

#### Leveling System
- **Max Level**: 30
- **Hidden Abilities** (Năng Lực Tiềm Ẩn): 2 abilities
  - Unlock at **Level 4** (first ability)
  - Unlock at **Level 8** (second ability)

#### Equipment Slots
- **5 Trang Sức** (Accessories)
- **1 Bảo Cụ** (Legacy Item)

#### Skills System
- **1 Kỹ Năng Cấp** (Base Skill) - scales with star level
- **2 Kỹ Năng Thức Tỉnh** (Awakening Skills)

### In-Battle Star System

Khi vào trận, hero có thể nâng cấp tối đa **7 cấp độ**:

| Cấp Độ | Sao | Loại Sao |
|--------|-----|----------|
| 1-2 | 1-2 ⭐ | Sao Đồng (Bronze) |
| 3-4 | 3-4 ⭐ | Sao Bạc (Silver) |
| 5-6 | 5-6 ⭐ | Sao Vàng (Gold) |
| 7 | 7 ⭐ | Sao Tím (Purple) |

**Quy tắc**: Cứ 2 cấp độ = 1 sao. Mỗi cấp sao tăng chỉ số kỹ năng cấp.

## Altar System (Tế Đàn)

### Quy tắc Altar
- **Tổng điểm**: 25 điểm tế đàn
- **Max Level mỗi Altar**: 15 cấp độ
- **Kích hoạt hiệu ứng**: Mỗi 5 cấp độ (Level 5, 10, 15)

### 6 Loại Altar

#### 1. Hero Altar (Anh Hùng)
| Cấp | Hiệu Ứng |
|-----|----------|
| 1 | 1% nâng cấp khi triệu hồi |
| 5 | 5% nâng cấp khi triệu hồi, 5% nâng cấp khi hợp nhất |
| 10 | 10% nâng cấp khi triệu hồi, 10% nâng cấp khi hợp nhất, Sách Sức Mạnh Lv.1 khi bắt đầu |
| 15 | 15% nâng cấp khi triệu hồi, 15% nâng cấp khi hợp nhất, Sách Sức Mạnh Lv.2 khi bắt đầu |

#### 2. Black Smith Altar (Thợ Rèn)
| Cấp | Hiệu Ứng |
|-----|----------|
| 1 | 2% tăng bậc khi luyện |
| 5 | 10% tăng bậc khi luyện, Luyện bậc 1 khi bắt đầu |
| 10 | 20% tăng bậc khi luyện, Luyện bậc 2 khi bắt đầu, 1 lần tái giám định |
| 15 | 30% tăng bậc khi luyện, Luyện bậc 3 khi bắt đầu, 2 lần tái giám định |

#### 3. Blood Altar (Máu)
| Cấp | Hiệu Ứng |
|-----|----------|
| 1 | Hút máu vật lý/phép 2% |
| 5 | Hút máu vật lý/phép 10%, Tổng lực tấn công +2.5% |
| 10 | Hút máu vật lý/phép 20%, Tổng lực tấn công +3.75%, 2 lần phòng thủ tuyệt đối khi khai trận |
| 15 | Hút máu vật lý/phép 30%, Tổng lực tấn công +5%, 3 lần phòng thủ tuyệt đối khi khai trận |

#### 4. Giant Altar (Cự Thần)
| Cấp | Hiệu Ứng |
|-----|----------|
| 1 | Lực phòng thủ +15 |
| 5 | Lực phòng thủ +75, Tổng máu +2.5% |
| 10 | Lực phòng thủ +150, Tổng máu +3.75%, Phản 10% sát thương (Phép: giảm 50%) |
| 15 | Lực phòng thủ +225, Tổng máu +5%, Phản 20% sát thương (Phép: giảm 50%) |

#### 5. Mage Altar (Pháp Sư)
| Cấp | Hiệu Ứng |
|-----|----------|
| 1 | Mana khi khai trận +5% |
| 5 | Mana khi khai trận +25%, Tổng lực phép +2.5% |
| 10 | Mana khi khai trận +50%, Tổng lực phép +3.75%, Mana khi tiêu diệt +50% |
| 15 | Mana khi khai trận +75%, Tổng lực phép +5%, Mana khi tiêu diệt +99% |

#### 6. Greed Altar (Tham Vọng)
| Cấp | Hiệu Ứng |
|-----|----------|
| 1 | Bạc khởi đầu +1 |
| 5 | Bạc khởi đầu +6, Vòng tinh nhuệ: Bạc +5 |
| 10 | Bạc khởi đầu +12, Vòng tinh nhuệ: Bạc +10, Thương nhân giảm giá 20% |
| 15 | Bạc khởi đầu +18, Vòng tinh nhuệ: Bạc +15, Thương nhân giảm giá 40% |

## Relic System (Cổ Vật)

### Quy tắc Relic
- **Tổng số**: 49 cổ vật
- **Max Upgrade Level**: 4 cấp độ
- **Stats Grid**: 4 hàng × 6 cột

### 4 Loại Relic

| Loại | Số lượng |
|------|----------|
| **Rương Triệu Hồi** (Summon Chest) | 13 |
| **Xâm Thực** (Corruption) | 14 |
| **Đấu Trường** (Arena) | 16 |
| **Đặc Biệt** (Special) | 6 |

### 4 Chỉ Số Bổ Trợ
1. **Công Vật Lý** (Physical ATK)
2. **Máu** (HP)
3. **Tốc Đánh** (Attack Speed)
4. **Công Phép** (Magic ATK)

## Rift Equipment System (Trang Bị Khe Nứt)

### Crafting System
- **Nguồn**: Tinh Thể Khe Nứt (Rift Crystals)
  - Nhận từ Khe Nứt Không Gian (Space Rift)
  - **Sản xuất** (Craft): Tổ hợp 2 trang bị
  - **Phân hủy** (Dissolve): Xóa tinh thể → nhận 1 trang bị ngẫu nhiên
  - **Thanh tẩy** (Purify): Xóa tinh thể → nhận 2 trang bị

### 6 Loại Rift Equipment

| Tên | Công Thức | Tên Tiếng Anh |
|-----|-----------|---------------|
| **Thương Dài** | Thần Giáp + Thần Cung | Spear |
| **Mặt Nạ** | Thần Giáp + Thần Trượng | Mask |
| **Quả Cầu** | Thần Cung + Thần Trượng | Orb |
| **Khiên** | Thần Kiếm + Thần Giáp | Shield |
| **Đoản Kiếm** | Thần Kiếm + Thần Trượng | Short Sword |
| **Song Kiếm** | Thần Kiếm + Thần Cung | Dual Swords |

**Base Equipment Types**:
- Thần Kiếm (Divine Sword)
- Thần Giáp (Divine Armor)
- Thần Cung (Divine Bow)
- Thần Trượng (Divine Staff)

### Stats System
- **2 Chỉ Số Chủ Lực** (Main Stats)
- **3 Chỉ Số Bổ Trợ** (Sub Stats)
- **Max Upgrade Level**: 4 cấp độ (mỗi cấp tăng cả main và sub stats)

---

**Last Updated**: 2026-03-28  
**Data Source**: Game version current
