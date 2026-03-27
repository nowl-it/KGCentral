from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os

from src.config import settings
from src.routes import health, inference, models
from src.i18n import init_i18n


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_i18n()
    yield


app = FastAPI(
    title="KGCentral AI Service",
    description="AI inference service for Raspberry Pi",
    version="1.0.0",
    lifespan=lifespan,
)

cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["Health"])
app.include_router(inference.router, prefix="/api/v1/inference", tags=["Inference"])
app.include_router(models.router, prefix="/api/v1/models", tags=["Models"])
