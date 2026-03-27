from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Any

router = APIRouter()


class InferenceRequest(BaseModel):
    model_name: str
    input_data: dict[str, Any]
    parameters: dict[str, Any] | None = None


class InferenceResponse(BaseModel):
    success: bool
    model_name: str
    output: dict[str, Any]
    inference_time_ms: float


@router.post("/", response_model=InferenceResponse)
async def predict(request: InferenceRequest):
    try:
        return InferenceResponse(
            success=True,
            model_name=request.model_name,
            output={"prediction": "mock_result", "confidence": 0.95},
            inference_time_ms=123.45,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/models")
async def list_models():
    return {
        "models": [
            {
                "name": "image-classifier",
                "type": "classification",
                "version": "1.0.0",
                "status": "loaded",
            },
            {
                "name": "object-detector",
                "type": "detection",
                "version": "1.0.0",
                "status": "loaded",
            },
        ]
    }
