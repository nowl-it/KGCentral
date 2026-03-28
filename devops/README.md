# DevOps

Cấu hình deployment cho KGCentral, hỗ trợ **Docker Compose** và **Kubernetes (K3s)**.

> **📊 Status:** ✅ Infrastructure Complete (Docker + K8s configs ready)
> **⚠️ Security:** CRITICAL issues - hardcoded secrets in configs (see below)

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

| Service | Variable | Default | Mô tả | Security |
|---------|----------|---------|-------|----------|
| backend | `DATABASE_URL` | postgresql://postgres:postgres@db:5432/kgcentral | PostgreSQL connection | 🔴 Hardcoded password |
| backend | `JWT_SECRET` | change-this-secret-in-production | JWT signing secret | 🔴 Weak default |
| backend | `CORS_ORIGINS` | http://localhost:3000 | Allowed origins | ✅ OK |
| ai-service | `DEVICE` | cpu | PyTorch device | ✅ OK |
| ai-service | `LOG_LEVEL` | info | Logging level | ✅ OK |
| db | `POSTGRES_PASSWORD` | postgres | Database password | 🔴 Weak default |

**🔴 CRITICAL:** Change `JWT_SECRET` and `POSTGRES_PASSWORD` before deploying!

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

Secrets được quản lý trong `k8s/base/secrets.yaml`:

- `jwt-secret`: JWT signing key
- `database-url`: PostgreSQL connection string

**🔴 CRITICAL SECURITY ISSUE:** Secrets are stored in PLAINTEXT in the repository!

```yaml
# ❌ HIỆN TẠI - devops/k8s/base/secrets.yaml
kind: Secret
stringData:
  jwt-secret: "change-this-secret-in-production"  # ⚠️ PLAINTEXT!
  database-url: "postgresql://postgres:postgres@postgres:5432/kgcentral"  # ⚠️ PLAINTEXT!
```

**✅ RECOMMENDED FIX:**

Use **Sealed Secrets** hoặc **External Secrets Operator**:

```bash
# Install Sealed Secrets controller
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/controller.yaml

# Encrypt secrets
kubeseal --format yaml < secrets.yaml > sealed-secrets.yaml

# Apply encrypted secrets
kubectl apply -f sealed-secrets.yaml
```

Or use **external secret management** (AWS Secrets Manager, HashiCorp Vault, etc.)

## Security Issues Summary

### 🔴 CRITICAL (Must Fix Before Production)

1. **Hardcoded JWT_SECRET** in `docker-compose.yml`
   - Current: `change-this-secret-in-production`
   - Fix: Use environment variable with strong random key (`openssl rand -base64 64`)

2. **Weak Database Password** in `docker-compose.yml`
   - Current: `postgres`
   - Fix: Generate strong password (32+ characters)

3. **Plaintext K8s Secrets** in `k8s/base/secrets.yaml`
   - Current: Secrets visible in git repository
   - Fix: Use Sealed Secrets or External Secrets Operator

4. **No Authentication on AI Service**
   - AI endpoints are publicly accessible
   - Fix: Add JWT verification or API key authentication

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
