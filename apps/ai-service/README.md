# KGCentral AI Service

Dịch vụ AI inference của KGCentral, xây dựng bằng **FastAPI** và **PyTorch**, được tối ưu cho **Raspberry Pi 4** (CPU-only).

## Tech Stack

- **FastAPI 0.115.12** - Web framework ✅
- **PyTorch 2.6.0** - Deep learning inference ✅
- **Ollama + Qwen2.5:3b** - AI Chat (LLM local) ✅
- **Pydantic 2.10.0** - Data validation & settings ✅
- **uvicorn** - ASGI server ✅
- **Python** ≥ 3.12 ✅
- **i18next** - Internationalization (vi/en) ✅

## Implementation Status

### ✅ Fully Implemented

- **AI Chat** - Chat với Qwen2.5:3b qua Ollama (tiếng Việt tốt)
- **Game Data API** - Load heroes/relics từ JSON files
- **Team Synergy Calculator** - Tính điểm synergy với 4 factors
- **PyTorch Neural Networks** - TeamRecommender model (128K params)
- **Health check** - `/health` endpoint
- FastAPI server structure
- Route organization
- Pydantic Settings configuration
- CORS middleware
- i18n support (Vietnamese/English)
- API documentation (Swagger/ReDoc)

### 🔲 Planned

- Neural network training với real data
- Model fine-tuning cho game-specific recommendations

## Cấu Trúc

```
src/
├── main.py              # FastAPI app, CORS, router registration
├── config.py            # Settings (Pydantic BaseSettings)
├── i18n.py              # i18n setup (vi/en)
├── game_data.py         # Load heroes/relics từ JSON
├── synergy.py           # Team synergy calculator
├── ai_manager.py        # PyTorch model manager
├── training.py          # Training utilities
├── models/
│   ├── __init__.py
│   └── neural_nets.py   # HeroEmbedding, TeamSynergyNet, TeamRecommender
└── routes/
    ├── health.py        # Health check ✅
    ├── inference.py     # AI inference
    ├── models.py        # Model management
    ├── game.py          # Game data API ✅
    └── chat.py          # AI Chat với Ollama ✅
```

## API Endpoints

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |

### Chat (AI Assistant)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/chat/status` | Check Ollama & model status |
| `POST` | `/api/v1/chat/` | Chat với AI về King God Castle |
| `POST` | `/api/v1/chat/quick` | Quick chat (không cần history) |

**Chat Request:**
```json
{
  "message": "Có bao nhiêu heroes trong game?",
  "history": []
}
```

**Chat Response:**
```json
{
  "response": "Tổng số heroes trong game là 70.",
  "model": "qwen2.5:3b"
}
```

### Game Data

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/game/heroes` | Danh sách tất cả heroes |
| `GET` | `/api/v1/game/heroes/region/{region}` | Heroes theo vùng |
| `GET` | `/api/v1/game/heroes/{hero_id}` | Chi tiết hero |
| `GET` | `/api/v1/game/relics` | Danh sách relics |
| `POST` | `/api/v1/game/team/analyze` | Phân tích team synergy |

**Team Analysis Request:**
```json
{
  "hero_ids": ["hero_east_001", "hero_west_001", ...],
  "altar_build": {"hero": 10, "blacksmith": 5, ...},
  "relic_ids": ["relic_summon_001", ...]
}
```

**Team Analysis Response:**
```json
{
  "total_score": 79.0,
  "grade": "A",
  "breakdown": {
    "region_synergy": {"score": 40, "dominant_region": "east"},
    "class_balance": {"score": 100, "variety": 6},
    "altar_match": {"score": 70},
    "relic_synergy": {"score": 100}
  },
  "recommendations": ["Consider adding more heroes from east region"]
}
```

## Cấu Hình

```env
# apps/ai-service/.env
DEVICE=cpu
LOG_LEVEL=info
MODEL_DIR=/models
DEFAULT_LOCALE=vi
```

## Chạy Development

### 1. Setup Ollama (cho AI Chat)

```bash
# Cài đặt Ollama (nếu chưa có)
curl -fsSL https://ollama.com/install.sh | sh

# Pull model (chọn 1 trong 2)
ollama pull qwen2.5:3b   # Nhẹ, phù hợp RPi4 (~2GB RAM)
ollama pull qwen2.5:7b   # Chất lượng cao hơn (~5GB RAM)
```

### 2. Chạy AI Service

```bash
cd apps/ai-service

# Tạo virtual environment
python3 -m venv venv
source venv/bin/activate

# Cài đặt dependencies
pip install fastapi uvicorn httpx torch pydantic-settings

# Chạy server
uvicorn src.main:app --reload --host 0.0.0.0 --port 5000
```

Server chạy tại [http://localhost:5000](http://localhost:5000).

API docs (Swagger): [http://localhost:5000/docs](http://localhost:5000/docs)

## Raspberry Pi 4 Compatibility

| Component | RAM | RPi4 8GB |
|-----------|-----|----------|
| OS + overhead | ~1GB | ✅ |
| Qwen2.5:3b | ~2.5GB | ✅ |
| FastAPI + PyTorch | ~500MB | ✅ |
| **Total** | ~4GB | ✅ Còn dư ~4GB |

**Recommend cho RPi4:** `qwen2.5:3b` (balance tốt giữa chất lượng và performance)

## i18n

Service hỗ trợ đa ngôn ngữ:

```python
from src.i18n import t

t("health.ok")              # "Dịch vụ hoạt động tốt" (Vietnamese)
t("health.ok", locale="en") # "Service is healthy" (English)
```

## Docker

```bash
docker build -f devops/docker/Dockerfile.ai-service -t kgcentral-ai .
docker run -p 5000:5000 kgcentral-ai
```

## Linting

```bash
ruff check src/
ruff format src/
```
