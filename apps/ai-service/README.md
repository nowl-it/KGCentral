# KGCentral AI Service

Dịch vụ AI inference của KGCentral, xây dựng bằng **FastAPI** và **PyTorch**, được tối ưu cho **Raspberry Pi** (CPU-only).

## Tech Stack

- **FastAPI** ≥ 0.115 - Web framework
- **PyTorch** ≥ 2.5 - Deep learning inference
- **Pydantic** ≥ 2.10 - Data validation & settings
- **uvicorn** - ASGI server
- **Python** ≥ 3.12

## Cấu Trúc

```
src/
├── main.py          # FastAPI app, CORS, router registration
├── config.py        # Settings (Pydantic BaseSettings)
├── i18n.py          # Đa ngôn ngữ (vi/en)
└── routes/
    ├── __init__.py
    ├── health.py     # Health check endpoint
    ├── inference.py  # AI inference endpoint
    └── models.py     # Model management endpoints
```

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

### Health

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| `GET` | `/health` | Health check |

### Inference

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| `POST` | `/api/v1/inference/` | Chạy inference |

**Request body:**
```json
{
  "model_name": "image-classifier",
  "input_data": { "image": "base64..." },
  "parameters": { "threshold": 0.5 }
}
```

**Response:**
```json
{
  "success": true,
  "model_name": "image-classifier",
  "output": { "prediction": "...", "confidence": 0.95 },
  "inference_time_ms": 123.45
}
```

### Models

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| `GET` | `/api/v1/models/` | Danh sách models |
| `POST` | `/api/v1/models/load` | Load model vào bộ nhớ |
| `POST` | `/api/v1/models/unload` | Giải phóng model khỏi bộ nhớ |

## i18n

Service có hệ thống i18n riêng cho messages:

```python
from src.i18n import t

t("health.ok")              # "Dịch vụ hoạt động tốt"
t("health.ok", locale="en") # "Service is healthy"
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
pyright src/
```
