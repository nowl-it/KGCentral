# KGCentral Game Documentation

This directory contains comprehensive game data documentation for **King God Castle**, used for training the AI recommendation system and serving as the knowledge base for the platform.

## Directory Structure

```
docs/
├── game-data/           # Game data for AI training
│   ├── heroes/          # Hero statistics, skills, and strategies
│   ├── equipment/       # Equipment stats, sets, and bonuses
│   ├── altars/          # Altar effects and tier information
│   ├── relics/          # Relic abilities and synergies
│   ├── mechanics/       # Game mechanics and formulas
│   └── synergies/       # Team synergies and meta compositions
└── README.md            # This file
```

## Purpose

### AI Training Data
All documents in `game-data/` are structured to be consumed by the AI service (`apps/ai-service`) for:
- **Team composition recommendations**: Suggest optimal hero combinations
- **Synergy scoring**: Calculate team effectiveness based on hero/equipment/altar/relic interactions
- **Meta analysis**: Identify top-tier strategies and counters
- **Build optimization**: Recommend equipment and altar configurations

### Wiki Content
These documents also serve as the authoritative source for the Wiki pages on the frontend, ensuring consistency between AI recommendations and user-facing information.

## Data Format

### Recommended Structure
Each category should follow a consistent format for easy parsing:

**For Heroes** (`heroes/`):
- Hero name, class, faction
- Base stats (HP, ATK, DEF, SPD)
- Skills (active, passive, ultimate)
- Tier rankings (PvE, PvP, Boss)
- Synergies with other heroes
- Recommended equipment/altars/relics

**For Equipment** (`equipment/`):
- Equipment name, type, tier
- Base stats and bonuses
- Set effects (if applicable)
- Best heroes to use with
- Upgrade paths and materials

**For Altars** (`altars/`):
- Altar name, tier
- Effects and bonuses
- Recommended team compositions
- Upgrade requirements

**For Relics** (`relics/`):
- Relic name, type
- Effects and abilities
- Synergies with heroes/equipment
- Acquisition methods

**For Mechanics** (`mechanics/`):
- Damage formulas
- Stat calculations
- Game modes (PvE, PvP, Boss, Guild War)
- Progression systems

**For Synergies** (`synergies/`):
- Meta team compositions
- Faction bonuses
- Skill interactions
- Counter strategies

## File Formats

### Supported Formats
- **Markdown** (`.md`): Preferred for human-readable documentation
- **JSON** (`.json`): For structured data that AI can easily parse
- **YAML** (`.yaml`): For hierarchical data (e.g., skill trees)
- **CSV** (`.csv`): For tabular data (e.g., stat comparisons)

### Example File Names
```
heroes/
├── README.md                    # Overview of all heroes
├── s-tier-heroes.md             # S-tier hero analysis
├── arthur.json                  # Individual hero data (JSON)
├── lancelot.json
└── tier-list.csv                # Hero tier rankings

equipment/
├── README.md
├── legendary-sets.md
├── warrior-gear.json
└── equipment-stats.csv

synergies/
├── README.md
├── meta-compositions.md
├── faction-bonuses.json
└── counter-teams.md
```

## Contributing Game Data

### Guidelines
1. **Accuracy**: Ensure all stats and mechanics are current with the latest game version
2. **Completeness**: Include all relevant information (stats, skills, synergies)
3. **Consistency**: Follow the established format for each category
4. **Sources**: Cite sources when possible (official patch notes, game screenshots)
5. **Vietnamese Priority**: Primary content should be in Vietnamese, with English translations where helpful

### Version Tracking
When game updates introduce balance changes:
- Update affected files with new data
- Add a changelog entry noting the game version
- Archive old data if necessary (use `archived/` subdirectory)

## AI Integration

The AI service (`apps/ai-service`) will:
1. Parse these documents during initialization
2. Build knowledge graphs of hero/equipment/altar/relic relationships
3. Use embeddings (via PyTorch) to understand synergies
4. Generate recommendations based on user input (team composition, game mode, player level)

### Current Status
⚠️ **Not yet implemented** (0% complete)
- PyTorch integration pending
- Document parsing logic pending
- Synergy scoring algorithm pending

See `apps/ai-service/README.md` for implementation roadmap.

## Maintenance

### Regular Updates
- **After game patches**: Update stats, new heroes, balance changes
- **Meta shifts**: Document new top-tier compositions
- **Community feedback**: Incorporate player discoveries and strategies

### Data Validation
Before committing new data:
- Verify stats against in-game values
- Test AI recommendations if applicable
- Ensure markdown/JSON syntax is valid

---

**Last Updated**: 2026-03-28  
**Game Version**: TBD  
**Maintainer**: @nowl
