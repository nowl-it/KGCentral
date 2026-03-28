# Testing AI Service

## ✅ Server is Running!

AI Service đã được setup và đang chạy tại: **http://localhost:5000**

---

## 📚 API Documentation

Swagger UI (Interactive API docs): **http://localhost:5000/docs**

---

## 🧪 Available Endpoints

### Health Check
```bash
curl http://localhost:5000/health
```

**Response:**
```json
{
  "status": "ok",
  "service": "ai-service",
  "version": "1.0.0"
}
```

---

### Game Data Endpoints

#### 1. Get All Heroes
```bash
curl http://localhost:5000/api/v1/game/heroes | jq
```

**Current Status:** ✅ 1 example hero loaded (need 5 more for team analysis)

#### 2. Get Heroes by Region
```bash
curl http://localhost:5000/api/v1/game/heroes/region/East | jq
curl http://localhost:5000/api/v1/game/heroes/region/West | jq
```

#### 3. Get Single Hero
```bash
curl http://localhost:5000/api/v1/game/heroes/hero_example_001 | jq
```

#### 4. Get All Relics
```bash
curl http://localhost:5000/api/v1/game/relics | jq
```

**Current Status:** ⚠️ 0 relics loaded (need 3 for team analysis)

#### 5. Get Example Team
```bash
curl http://localhost:5000/api/v1/game/team/example | jq
```

**Expected Response (when 6 heroes + 3 relics loaded):**
```json
{
  "hero_ids": ["hero_001", "hero_002", "hero_003", "hero_004", "hero_005", "hero_006"],
  "altar_build": {
    "hero": 5,
    "blackSmith": 5,
    "blood": 5,
    "giant": 5,
    "mage": 5,
    "greed": 0
  },
  "relic_ids": ["relic_001", "relic_002", "relic_003"],
  "note": "This is an example team. Modify and use with POST /game/team/analyze"
}
```

---

### Team Synergy Analysis

#### Analyze Team Composition
```bash
curl -X POST http://localhost:5000/api/v1/game/team/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "hero_ids": ["hero_east_001", "hero_east_002", "hero_west_001", "hero_north_001", "hero_south_001", "hero_central_001"],
    "altar_build": {
      "hero": 5,
      "blackSmith": 5,
      "blood": 5,
      "giant": 5,
      "mage": 5,
      "greed": 0
    },
    "relic_ids": ["relic_summon_001", "relic_arena_001", "relic_corruption_001"]
  }' | jq
```

**Expected Response:**
```json
{
  "total_score": 75.5,
  "grade": "A",
  "breakdown": {
    "region_synergy": {
      "score": 60,
      "distribution": {"East": 2, "West": 1, "North": 1, "South": 1, "Central": 1},
      "dominant_region": "East"
    },
    "class_balance": {
      "score": 75,
      "distribution": {"Warrior": 2, "Mage": 2, "Support": 2},
      "variety": 3
    },
    "altar_match": {
      "score": 70,
      "altar_build": {...}
    },
    "relic_synergy": {
      "score": 100,
      "types": ["summon_chest", "arena", "corruption"],
      "loaded_count": 3
    }
  },
  "recommendations": [
    "Consider adding more heroes from East region for synergy bonus",
    "Great team composition! Consider fine-tuning positioning on the 7x4 board."
  ]
}
```

---

## 📊 Current Data Status

| Category | Loaded | Needed | Status |
|----------|--------|--------|--------|
| **Heroes** | 1 | 6+ | ⚠️ Need 5 more |
| **Relics** | 0 | 3+ | ❌ Need 3 |
| **Altars** | ✅ | ✅ | Documented (not in JSON) |
| **Equipment** | 📋 | 📋 | Documented (not in JSON) |

---

## 🎯 Next Steps to Test Full Functionality

### 1. Add Hero Data
Create at least 5 more hero JSON files in:
```
docs/game-data/heroes/
├── east/
│   ├── hero-east-001.json
│   └── hero-east-002.json
├── west/
│   └── hero-west-001.json
└── ...
```

**Use template from:** `docs/game-data/heroes/README.md`

### 2. Add Relic Data
Create at least 3 relic JSON files in:
```
docs/game-data/relics/
├── summon/
│   └── relic-summon-001.json
├── arena/
│   └── relic-arena-001.json
└── corruption/
    └── relic-corruption-001.json
```

**Use template from:** `docs/game-data/relics/README.md`

### 3. Restart Server
After adding data:
```bash
# The server will auto-reload with --reload flag
# Or manually restart:
cd apps/ai-service
source venv/bin/activate
python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 5000
```

---

## 🔧 Server Management

### Check Server Status
```bash
curl http://localhost:5000/health
```

### Stop Server
Press `CTRL+C` in the terminal running uvicorn

Or find and kill the process:
```bash
lsof -ti:5000 | head -1
# Then: kill <PID>
```

### View Server Logs
Server logs will show:
- Game data loading status
- Request logs
- Errors (if any)

---

## 🎮 AI Features Implemented

### ✅ Currently Working
1. **Game Data Loader** - Reads JSON files from `docs/game-data/`
2. **Hero API** - Get heroes by ID, region, or all
3. **Relic API** - Get relics by ID, type, or all
4. **Synergy Calculator** - Calculates team synergy scores based on:
   - Region distribution (20% weight)
   - Class balance (30% weight)
   - Altar-hero match (30% weight)
   - Relic synergy (20% weight)
5. **Team Recommendations** - Suggests improvements

### 🔲 Not Yet Implemented
1. **PyTorch Integration** - Currently not using ML models
2. **Advanced Synergy Scoring** - Using simple heuristics
3. **Battle Board Positioning** - Not analyzing 7×4 grid placement
4. **Equipment Optimization** - Not recommending rift equipment
5. **Meta Team Database** - No pre-defined meta compositions

---

## 💡 Example Test Workflow

1. **Check Server**: `curl http://localhost:5000/health`
2. **View Swagger UI**: Open browser to `http://localhost:5000/docs`
3. **Get Heroes**: `curl http://localhost:5000/api/v1/game/heroes | jq`
4. **Add More Heroes**: Create JSON files in `docs/game-data/heroes/`
5. **Test Team Analysis**: Use POST `/api/v1/game/team/analyze` with 6 heroes
6. **Get Recommendations**: Check the `recommendations` array in response

---

**Last Updated**: 2026-03-28  
**Server Status**: 🟢 Running on http://localhost:5000  
**Ready for Testing**: ✅ API endpoints working, need more game data
