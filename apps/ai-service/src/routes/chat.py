"""
AI Chat Routes

Chat endpoint using Ollama + Qwen2.5 for game Q&A
"""
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field


router = APIRouter()

# Ollama config
OLLAMA_URL = "http://localhost:11434"
MODEL_NAME = "qwen2.5:7b"

# System prompt for game assistant
SYSTEM_PROMPT = """Bạn là trợ lý AI của KGCentral - cộng đồng game King God Castle.

Kiến thức của bạn về game:
- Team gồm 6 heroes, 25 điểm altar, 3 relics, 6 rift equipment
- Có 70 heroes chia 5 miền: Đông (13), Tây (12), Nam (14), Bắc (19), Trung (12)
- 6 loại altar: Hero, Blacksmith, Blood, Giant, Mage, Greed (mỗi loại max level 15)
- 49 relics: Rương triệu hồi (13), Xâm thực (14), Đấu trường (16), Đặc biệt (6)
- Bàn cờ 7x4, heroes có thể đặt bất kỳ vị trí nào
- Heroes có 4 cấp sao: đồng (1-2), bạc (3-4), vàng (5-6), tím (7)

Trả lời ngắn gọn, chính xác bằng tiếng Việt. Nếu không biết, hãy nói không biết."""


class ChatMessage(BaseModel):
    """Single chat message"""
    role: str = Field(..., description="'user' or 'assistant'")
    content: str


class ChatRequest(BaseModel):
    """Chat request"""
    message: str = Field(..., description="User's message")
    history: list[ChatMessage] = Field(default=[], description="Previous messages")


class ChatResponse(BaseModel):
    """Chat response"""
    response: str
    model: str = MODEL_NAME


async def check_ollama_available() -> bool:
    """Check if Ollama server is running"""
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.get(f"{OLLAMA_URL}/api/tags")
            return resp.status_code == 200
    except Exception:
        return False


async def check_model_available() -> bool:
    """Check if the model is pulled"""
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.get(f"{OLLAMA_URL}/api/tags")
            if resp.status_code == 200:
                data = resp.json()
                models = [m.get("name", "") for m in data.get("models", [])]
                return MODEL_NAME in models or MODEL_NAME.split(":")[0] in [m.split(":")[0] for m in models]
            return False
    except Exception:
        return False


@router.get("/status")
async def chat_status():
    """Check chat service status"""
    ollama_ok = await check_ollama_available()
    model_ok = await check_model_available() if ollama_ok else False
    
    return {
        "service": "chat",
        "ollama_running": ollama_ok,
        "model_available": model_ok,
        "model_name": MODEL_NAME,
        "ready": ollama_ok and model_ok
    }


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat with AI assistant
    
    Send a message and get AI response about King God Castle game.
    """
    # Check Ollama
    if not await check_ollama_available():
        raise HTTPException(
            status_code=503,
            detail="Ollama server not running. Start with: ollama serve"
        )
    
    if not await check_model_available():
        raise HTTPException(
            status_code=503,
            detail=f"Model {MODEL_NAME} not available. Pull with: ollama pull {MODEL_NAME}"
        )
    
    # Build messages
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    
    # Add history
    for msg in request.history[-10:]:  # Last 10 messages
        messages.append({"role": msg.role, "content": msg.content})
    
    # Add current message
    messages.append({"role": "user", "content": request.message})
    
    # Call Ollama
    try:
        async with httpx.AsyncClient(timeout=120.0) as client:
            resp = await client.post(
                f"{OLLAMA_URL}/api/chat",
                json={
                    "model": MODEL_NAME,
                    "messages": messages,
                    "stream": False,
                    "options": {
                        "temperature": 0.7,
                        "top_p": 0.9,
                    }
                }
            )
            
            if resp.status_code != 200:
                raise HTTPException(status_code=500, detail=f"Ollama error: {resp.text}")
            
            data = resp.json()
            ai_response = data.get("message", {}).get("content", "")
            
            return ChatResponse(response=ai_response, model=MODEL_NAME)
            
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Request timeout - model may be loading")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/quick")
async def quick_chat(message: str):
    """
    Quick chat without history
    
    Simple endpoint for one-off questions.
    """
    request = ChatRequest(message=message, history=[])
    return await chat(request)
