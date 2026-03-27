from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()


class ModelInfo(BaseModel):
    name: str
    type: str
    version: str
    status: str


@router.get("/")
async def list_models():
    return {
        "models": [
            ModelInfo(
                name="image-classifier",
                type="classification",
                version="1.0.0",
                status="loaded",
            ),
            ModelInfo(
                name="object-detector",
                type="detection",
                version="1.0.0",
                status="loaded",
            ),
        ]
    }


@router.post("/load")
async def load_model(model_name: str):
    return {"success": True, "model": model_name, "status": "loaded"}


@router.post("/unload")
async def unload_model(model_name: str):
    return {"success": True, "model": model_name, "status": "unloaded"}
