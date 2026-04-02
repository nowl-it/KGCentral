# KGCentral AI Service

Dịch vụ AI inference của KGCentral, xây dựng bằng **FastAPI** và **PyTorch**, được tối ưu cho **Raspberry Pi 4** (CPU-only).

## 🏰 Royal Guard AI

AI Chat được thiết kế với persona **Cận Vệ Hoàng Gia** - xưng "thần", gọi người dùng là "Bệ hạ". Sử dụng RAG (Retrieval Augmented Generation) để cung cấp thông tin chính xác từ game data.

## Tech Stack

- **FastAPI 0.115.12** - Web framework ✅
- **PyTorch 2.6.0** - Deep learning inference ✅
- **Ollama + Qwen2.5:3b** - AI Chat (LLM local) ✅
- **Pydantic 2.10.0** - Data validation & settings ✅
- **uvicorn** - ASGI server ✅
- **Python** ≥ 3.12 ✅

## Implementation Status

### ✅ Fully Implemented

- **AI Chat với persona Cận Vệ Hoàng Gia**
  - RAG: Inject dữ liệu hero thực vào prompt
  - Auto-detect ngôn ngữ từ user message
  - Few-shot learning với ví dụ mẫu
  - Markdown formatted responses
- **Game Data API** - 72 heroes, 318 artifacts, 273 equipment
  - **13 ngôn ngữ**: en, vi, ko, ja, zh-CN, zh-TW, de, fr, es, pt, ru, th, ar
  - Sử dụng bản dịch chính thức từ game
- **Team Synergy Calculator** - Tính điểm synergy với 4 factors
- **PyTorch Neural Networks** - TeamRecommender model (128K params)
- Health check, CORS, API documentation (Swagger/ReDoc)

### 🔲 Planned

- Neural network training với real data
- Model fine-tuning cho game-specific recommendations

## Game Data (Version 167.0.01)

| Category | Count | Languages |
|----------|-------|-----------|
| Heroes | 72 | 13 |
| Artifacts | 318 | 13 |
| Equipment | 273 | - |
| Altars | 15 | 13 |
| Synergies | 62 | 13 |

**Supported Languages:** English, Tiếng Việt, 한국어, 日本語, 简体中文, 繁體中文, Deutsch, Français, Español, Português, Русский, ไทย, العربية

## API Endpoints

### Chat (AI Assistant)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/chat/status` | Check Ollama & model status |
| `GET` | `/api/v1/chat/languages` | Get supported languages |
| `POST` | `/api/v1/chat/` | Chat với AI (auto-detect language) |
| `POST` | `/api/v1/chat/quick` | Quick chat |

**Chat Request:**
```json
{
  "message": "루니아르는 어떤 클래스야?",
  "history": [],
  "language": null
}
```

**Chat Response (Markdown format):**
```json
{
  "response": "**루니아르**는 **Mystique** 클래스의 서포터입니다.\n\n| 정보 | 값 |\n|------|----|\n| 지역 | North |\n| 역할 | 힐러/버퍼 |",
  "model": "qwen2.5:3b",
  "language": "ko"
}
```

### Game Data

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/game/languages` | Get supported languages |
| `GET` | `/api/v1/game/stats` | Game data statistics |
| `GET` | `/api/v1/game/heroes?lang=vi` | All heroes (localized) |
| `GET` | `/api/v1/game/heroes?region=North&lang=ko` | Filter by region |
| `GET` | `/api/v1/game/heroes/search/{name}` | Search by name (any lang) |
| `GET` | `/api/v1/game/relics?lang=ja` | Artifacts (localized) |
| `GET` | `/api/v1/game/synergies?lang=zh-CN` | Synergies (localized) |
| `POST` | `/api/v1/game/team/analyze` | Analyze team synergy |

**Hero Response (with `lang=vi`):**
```json
{
  "id": 10230,
  "name": "Luniare",
  "names": {
    "en": "Luniare",
    "vi": "Luniare", 
    "ko": "루니아르",
    "ja": "ルニアレ"
  },
  "region": "North",
  "role": "Mystique",
  "skillName": "Blessing of the Moon",
  "skillDescription": "Hồi phục HP cho đồng minh..."
}
```

## Chạy Development

### 1. Setup Ollama + Custom Model

```bash
# Cài đặt Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Option A: Sử dụng custom model (recommended)
cd apps/ai-service
./setup-model.sh   # Tạo kgcentral-guard model

# Option B: Sử dụng model gốc
ollama pull qwen2.5:3b
```

### 2. Chạy AI Service

```bash
cd apps/ai-service
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn httpx torch pydantic-settings
uvicorn src.main:app --reload --host 0.0.0.0 --port 5000
```

API docs: [http://localhost:5000/docs](http://localhost:5000/docs)

## Raspberry Pi 4 Compatibility

| Component | RAM |
|-----------|-----|
| OS + overhead | ~1GB |
| Qwen2.5:3b | ~2.5GB |
| FastAPI + PyTorch | ~500MB |
| **Total** | ~4GB ✅ |

## Docker

```bash
docker build -f devops/docker/Dockerfile.ai-service -t kgcentral-ai .
docker run -p 5000:5000 kgcentral-ai
```
