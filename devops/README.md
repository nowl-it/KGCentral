# DevOps

Cấu hình deployment cho KGCentral, hỗ trợ **Docker Compose** và **Kubernetes (K3s)**.

## Cấu Trúc

```
devops/
├── docker/
│   ├── Dockerfile.frontend      # Node 22, Next.js
│   ├── Dockerfile.backend       # Node 22, NestJS
│   └── Dockerfile.ai-service    # Python 3.12, FastAPI
└── k8s/
    ├── base/
    │   ├── kustomization.yaml   # Kustomize base
    │   ├── namespace.yaml       # Namespace "kgcentral"
    │   ├── frontend.yaml        # Frontend Deployment + Service
    │   ├── backend.yaml         # Backend Deployment + Service
    │   └── ai-service.yaml      # AI Service Deployment + Service
    └── overlays/
        ├── dev/                  # Dev environment patches
        └── prod/                 # Production environment patches
```

## Docker Compose

### Services

| Service | Base Image | Port | RAM Limit |
|---------|-----------|------|-----------|
| `frontend` | node:22-bookworm-slim | 3000 | - |
| `backend` | node:22-bookworm-slim | 4000 | - |
| `ai-service` | python:3.12-slim | 5000 | - |
| `db` | postgres:17-alpine | 5432 | 256M |

### Lệnh

```bash
# Từ root project

# Khởi động tất cả
docker-compose -f docker-compose.yml up -d

# Xem logs
docker-compose logs -f

# Dừng
docker-compose down

# Dừng và xóa volumes
docker-compose down -v
```

## Kubernetes (K3s)

Sử dụng **Kustomize** với base + overlays.

### Deploy

```bash
# Dev environment
kubectl apply -k devops/k8s/overlays/dev

# Production
kubectl apply -k devops/k8s/overlays/prod
```

### Gỡ cài đặt

```bash
kubectl delete -k devops/k8s/overlays/dev
```

### Build images cho K3s

Nếu dùng K3s local, build và import images:

```bash
# Build
docker build -f devops/docker/Dockerfile.frontend -t kgcentral-frontend .
docker build -f devops/docker/Dockerfile.backend -t kgcentral-backend .
docker build -f devops/docker/Dockerfile.ai-service -t kgcentral-ai-service .

# Import vào K3s
sudo k3s ctr images import <image.tar>
```

## Network

Tất cả services kết nối qua bridge network `kgcentral`:

```
frontend → backend (http://backend:4000)
backend  → db      (postgresql://postgres:postgres@db:5432/kgcentral)
```

AI service chạy độc lập, kết nối từ backend hoặc frontend qua HTTP.
