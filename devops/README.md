# DevOps

Cau hinh deployment cho KGCentral, ho tro **Docker Compose** va **Kubernetes (K3s)**.

## Cau Truc

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
    │   ├── secrets.yaml         # Secrets (JWT, DB credentials)
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

### Lenh

```bash
# Tu root project

# Khoi dong tat ca
docker-compose -f docker-compose.yml up -d

# Xem logs
docker-compose logs -f

# Dung
docker-compose down

# Dung va xoa volumes
docker-compose down -v
```

### Environment Variables

| Service | Variable | Default | Mo ta |
|---------|----------|---------|-------|
| backend | `DATABASE_URL` | postgresql://... | PostgreSQL connection |
| backend | `JWT_SECRET` | (required) | JWT signing secret |
| backend | `CORS_ORIGINS` | http://localhost:3000 | Allowed origins |
| ai-service | `DEVICE` | cpu | PyTorch device |
| ai-service | `LOG_LEVEL` | info | Logging level |

## Kubernetes (K3s)

Su dung **Kustomize** voi base + overlays.

### Deploy

```bash
# Dev environment
kubectl apply -k devops/k8s/overlays/dev

# Production
kubectl apply -k devops/k8s/overlays/prod
```

### Go cai dat

```bash
kubectl delete -k devops/k8s/overlays/dev
```

### Build images cho K3s

Neu dung K3s local, build va import images:

```bash
# Build
docker build -f devops/docker/Dockerfile.frontend -t kgcentral-frontend .
docker build -f devops/docker/Dockerfile.backend -t kgcentral-backend .
docker build -f devops/docker/Dockerfile.ai-service -t kgcentral-ai-service .

# Import vao K3s
sudo k3s ctr images import <image.tar>
```

### Secrets

Secrets duoc quan ly trong `k8s/base/secrets.yaml`:

- `jwt-secret`: JWT signing key
- `db-credentials`: PostgreSQL username/password

**Luu y**: Thay doi secrets truoc khi deploy production!

## Network

Tat ca services ket noi qua bridge network `kgcentral`:

```
frontend --> backend (http://backend:4000)
backend  --> db      (postgresql://postgres:postgres@db:5432/kgcentral)
backend  --> ai-service (http://ai-service:5000)
```

AI service chay doc lap, ket noi tu backend qua HTTP.

## Health Checks

| Service | Endpoint | Expected |
|---------|----------|----------|
| frontend | http://localhost:3000 | 200 OK |
| backend | http://localhost:4000/api/v1/health | 200 OK |
| ai-service | http://localhost:5000/health | 200 OK |
| db | pg_isready | exit 0 |
