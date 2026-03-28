# KGCentral AI Service

Dịch vụ AI inference của KGCentral, xây dựng bằng **FastAPI** và **PyTorch**, được tối ưu cho **Raspberry Pi** (CPU-only).

## Tech Stack

- **FastAPI 0.115.12** - Web framework ✅
- **PyTorch 2.6.0** - Deep learning inference 🔴 **NOT INTEGRATED** (installed but unused)
- **Pydantic 2.10.0** - Data validation & settings ✅
- **uvicorn** - ASGI server ✅
- **Python** ≥ 3.12 ✅
- **i18next** - Internationalization (vi/en) ✅

## Implementation Status

### ✅ Infrastructure Complete

- FastAPI server structure
- Route organization (/health, /api/v1/inference, /api/v1/models)
- Pydantic Settings configuration
- CORS middleware
- i18n support (Vietnamese/English)
- API documentation (Swagger/ReDoc)

### 🔴 AI Functionality NOT Implemented

- **PyTorch NOT INTEGRATED** - Zero `import torch` statements in codebase
- **No model files exist** - `/models` directory is unused
- **No tensor processing** - No actual computation
- **All endpoints return MOCK DATA:**
  - `POST /api/v1/inference/` → Returns hardcoded `{"prediction": "mock_result", "confidence": 0.95}`
  - `GET /api/v1/models/` → Returns hardcoded list of 2 fake models
  - `POST /api/v1/models/load` → Stub only (returns success without action)
  - `POST /api/v1/models/unload` → Stub only (returns success without action)
- **Synergy Scoring Algorithm** - Not implemented (core feature missing)
- **Model loading logic** - No `torch.load()`, no device placement
- **Inference execution** - No forward pass, no predictions

**Total AI Service Code:** ~60 LOC (mostly routing boilerplate)

## Cấu Trúc

```
src/
├── main.py          # FastAPI app, CORS, router registration (28 lines)
├── config.py        # Settings (Pydantic BaseSettings) (14 lines)
├── i18n.py          # i18n setup (vi/en) (12 lines)
└── routes/
    ├── __init__.py
    ├── health.py     # Health check endpoint (10 lines) ✅ Working
    ├── inference.py  # AI inference endpoint (31 lines) 🔴 Returns mock data
    └── models.py     # Model management (27 lines) 🔴 Stubs only
```

**Total:** ~122 LOC (including comments and blanks)

**🔴 What's Missing:**
- Model loading implementation
- PyTorch integration
- Tensor preprocessing
- Inference logic
- Synergy scoring algorithm
- Model caching/management
- Error handling for real failures

## Cấu Hình

```env
# apps/ai-service/.env
DEVICE=cpu
LOG_LEVEL=info
MODEL_DIR=/models
DEFAULT_LOCALE=vi
```

| Biến | Mặc định | Mô tả |
|------|----------|--------|
| `DEVICE` | `cpu` | Thiết bị tính toán (`cpu` cho Raspberry Pi) |
| `LOG_LEVEL` | `info` | Mức log |
| `MODEL_DIR` | `/models` | Thư mục chứa model files |
| `DEFAULT_LOCALE` | `vi` | Ngôn ngữ mặc định |

## Chạy Development

```bash
# Cài đặt dependencies
pip install -e ".[dev]"
# hoặc dùng uv
uv pip install -e ".[dev]"

# Chạy server
uvicorn src.main:app --reload --host 0.0.0.0 --port 5000
```

Server chạy tại [http://localhost:5000](http://localhost:5000).

API docs (Swagger): [http://localhost:5000/docs](http://localhost:5000/docs)

## API Reference

> ⚠️ **All AI endpoints return MOCK DATA only!**

### Health

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| `GET` | `/health` | ✅ Working | Returns `{"status": "ok", "service": "ai-service", "version": "1.0.0"}` |

### Inference

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/v1/inference/` | 🔴 Mock Only | Returns hardcoded prediction |
| `GET` | `/api/v1/inference/models` | 🔴 Mock Only | Returns hardcoded model list |

**Request body (ignored):**
```json
{
  "model_name": "synergy-scorer",
  "input_data": { "heroes": ["hero1", "hero2", "hero3"] },
  "parameters": { "threshold": 0.5 }
}
```

**Response (hardcoded):**
```json
{
  "success": true,
  "model_name": "synergy-scorer",
  "output": {
    "prediction": "mock_result",  // ⚠️ Always same value
    "confidence": 0.95             // ⚠️ Always same value
  },
  "inference_time_ms": 123.45      // ⚠️ Always same value
}
```

**🔴 Current Implementation:**
```python
# routes/inference.py (lines 21-31)
@router.post("/", response_model=InferenceResponse)
async def predict(request: InferenceRequest):
    try:
        # request.input_data is IGNORED!
        # request.parameters is IGNORED!
        return InferenceResponse(
            success=True,
            model_name=request.model_name,
            output={"prediction": "mock_result", "confidence": 0.95},  # ⚠️ HARDCODED
            inference_time_ms=123.45,  # ⚠️ HARDCODED
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### Models

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/v1/models/` | 🔴 Mock Only | Returns list of 2 fake models (image-classifier, object-detector) |
| `POST` | `/api/v1/models/load` | 🔴 Stub Only | Returns success without loading anything |
| `POST` | `/api/v1/models/unload` | 🔴 Stub Only | Returns success without unloading anything |

**Model List Response (hardcoded):**
```json
{
  "models": [
    {
      "name": "image-classifier",
      "status": "loaded",
      "device": "cpu"
    },
    {
      "name": "object-detector",
      "status": "unloaded",
      "device": "cpu"
    }
  ]
}
```

**🔴 No actual model management:** Models don't exist, status is fake.

## i18n

✅ **Status:** Fully implemented

Service has its own i18n system for messages:

```python
from src.i18n import t

t("health.ok")              # "Dịch vụ hoạt động tốt" (Vietnamese)
t("health.ok", locale="en") # "Service is healthy" (English)
t("inference.error")        # "Lỗi khi chạy inference"
```

**Supported languages:**
- Vietnamese (vi) - default
- English (en)

**Namespaces available:**
- `health` - Health check messages
- `inference` - Inference error messages
- `models` - Model management messages

## What Needs to Be Implemented

### Phase 1: PyTorch Integration
1. Import PyTorch in inference.py
2. Load model files from MODEL_DIR
3. Handle device placement (CPU for Raspberry Pi)
4. Implement model caching (singleton pattern)

### Phase 2: Synergy Scoring Algorithm
1. Define hero synergy matrix
2. Implement synergy calculation logic
3. Team composition scoring
4. Recommendation algorithm (greedy + beam search)

### Phase 3: Real Inference
1. Process input_data (hero IDs, team composition)
2. Run forward pass through model
3. Calculate actual inference time
4. Return real predictions

### Phase 4: Model Management
1. Implement actual model loading from disk
2. Memory management (load/unload)
3. Model versioning
4. Health checks for loaded models

### Phase 5: Production Features
1. Authentication (verify JWT from backend)
2. Rate limiting
3. Request logging
4. Error handling and recovery
5. Performance monitoring

## Docker

```bash
docker build -f devops/docker/Dockerfile.ai-service -t kgcentral-ai .
docker run -p 5000:5000 kgcentral-ai
```

## Linting

```bash
ruff check src/
ruff format src/
pyright src/
```
