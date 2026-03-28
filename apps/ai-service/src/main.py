from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os

from src.config import settings
from src.routes import health, inference, models, game, chat
from src.i18n import init_i18n
from src.game_data import game_data


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize i18n
    init_i18n()
    
    # Load game data
    print("🎮 Loading game data...")
    game_data.load_all()
    print("✅ Game data loaded")
    
    yield


app = FastAPI(
    title="KGCentral AI Service",
    description="AI inference service for King God Castle team recommendations",
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
app.include_router(game.router, prefix="/api/v1/game", tags=["Game Data"])
app.include_router(chat.router, prefix="/api/v1/chat", tags=["Chat"])
