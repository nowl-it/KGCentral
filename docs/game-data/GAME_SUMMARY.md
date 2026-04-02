# King God Castle - Game Data Summary

**Data Source:** Reversed from game version 167.0.01  
**Last Updated:** 2025-01-XX

## Statistics

| Category | Count |
|----------|-------|
| Heroes | 72 |
| Altars/Buildings | 15 |
| Equipment Items | 273 |
| Artifacts | 318 |
| Synergies | 62 |

## Heroes by Region

| Region | Count | Heroes |
|--------|-------|--------|
| North | 20 | Leonhardt, Mara, Luniare, Rahawk, Asiaq, Bombie, Cain, Lyca, Agathe, Gidnil, Kanak, Rie, Nibella, Taebaek, Baldir, Ophelia, Kirdan, Victoria, Elizabeth, Dandelyn |
| South | 15 | Daniel, Ren, Behemus, Rossette, Zupitere, Bardrey, Alberon, Hela, Zuo Bai, Tya, Neria, Esthea, Ian, Aenrath, Farael |
| East | 13 | Chung Ah, Yeon, Zuo Yun, Hansi, Thái Sơn, Hải Lang, Makina, Mano, Stone Spirit, Saeryung, Garam, Jinju, Suha |
| West | 12 | Lily, Jol, Draco, Mirsyl, Cathy, Priya, Aramis, Evan, Shelda, Luniare, Mel, Bombie |
| Central | 12 | Aramis, Evan, Shelda, Priya, Lyca, Mel, Halla, Diane, Ternev + more |

## Heroes by Class/Role

| Class | Count | Description |
|-------|-------|-------------|
| Tenacity | 15 | Tank - High HP, shield generation, frontline |
| Mystique | 13 | Support - Healing, buffing, mana regen |
| Shadow | 12 | Assassin - Backstab, crit damage, stealth |
| Courage | 11 | Fighter - Balanced, stun abilities |
| Swiftness | 11 | Archer - Ranged DPS, attack speed |
| Elemental | 10 | Mage - Magic damage, AoE skills |

## 6 Altars (Buildings)

| ID | Altar | Effect | Max Level |
|----|-------|--------|-----------|
| 0 | Hero Altar | % chance to tier up on summon | 15 |
| 1 | Blacksmith | % chance to tier up equipment on forge | 15 |
| 2 | Blood Altar | Increases HP | 15 |
| 3 | Giant Altar | Increases ATK | 15 |
| 4 | Mage Altar | Increases Magic ATK | 15 |
| 5 | Greed Altar | Increases gold income | 15 |

**Total Altar Points:** 25 per game  
**Distribution Strategy:** Focus on 2-3 altars based on team composition

## Equipment Types

| Type | Count | Description |
|------|-------|-------------|
| Sword | 4 | Melee weapon, ATK bonus |
| Armor | 4 | Defense, HP bonus |
| Bow | 4 | Ranged weapon, Attack Speed |
| Staff | 4 | Magic weapon, MATK bonus |
| Rune | 64 | Special effects |
| GodItem | 7 | Ultimate tier items |
| RiftWeapon | 6 | Special weapons |

## Tier System

Heroes and equipment have tiers 1-4:

| Tier | Stars | Merge Requirement |
|------|-------|-------------------|
| 1 | ★ | Base |
| 2 | ★★ | 2x Tier 1 |
| 3 | ★★★ | 2x Tier 2 |
| 4 | ★★★★ | 2x Tier 3 |

## Region Synergy

Having multiple heroes from the same region activates synergy:

| Heroes | Bonus |
|--------|-------|
| 2 | +5 Altar Level |
| 3 | +10 Altar Level |
| 4 | +15 Altar Level |
| 5 | +20 Altar Level |
| 6 | +25 Altar Level |

## Meta Heroes (Patch 167.0.01)

### S+ Tier (Must Have)
- **Luniare** (Mystique/North) - Best support, mana battery
- **Bardrey** (Swiftness/South) - Mana regen for team
- **Mel** (Courage/Central) - Burst DPS

### S Tier (Very Strong)
- **Ian** (Tenacity/South) - Best tank
- **Mano** (Elemental/East) - Magic DPS
- **Victoria** (Shadow/North) - Assassin

### A Tier (Solid Picks)
- Shelda, Daniel, Leonhardt, Evan
- Asiaq, Mirsyl, Alberon
- Priya, Hela, Draco

## Team Composition Tips

1. **Standard Team (5-6 heroes):**
   - 1-2 Tanks (Tenacity)
   - 2-3 DPS (Courage/Swiftness/Elemental/Shadow)
   - 1 Support (Mystique)

2. **Region Synergy Focus:**
   - Pick 3+ heroes from same region for altar bonus
   - North has most options (20 heroes)

3. **Altar Priority:**
   - Early game: Hero Altar (tier up chance)
   - Mid game: Blood/Giant based on team
   - Late game: Specialize based on carry

## Data Files

All data is extracted to JSON files in this directory:

- `heroes/all-heroes.json` - 72 heroes with stats, skills, descriptions
- `altars/all-altars.json` - 15 buildings with effects
- `relics/all-relics.json` - 318 artifacts
- `equipment/all-equipment.json` - 273 items
- `synergies/all-synergies.json` - 62 synergy definitions

## API Endpoints

Use the AI service to query this data:

```bash
# Get all heroes
curl http://localhost:5000/api/v1/game/heroes

# Get heroes by region
curl http://localhost:5000/api/v1/game/heroes/region/North

# Get heroes by class
curl http://localhost:5000/api/v1/game/heroes/role/Mystique

# Search hero by name
curl http://localhost:5000/api/v1/game/heroes/search/Luniare

# Get stats summary
curl http://localhost:5000/api/v1/game/stats
```
