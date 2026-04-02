"""
AI Chat Routes

Chat endpoint using Ollama + Qwen2.5 for game Q&A.
Uses RAG (Retrieval Augmented Generation) to inject real game data into prompts.
Supports multiple languages with official game translations.
Returns markdown-formatted responses.
"""
import httpx
import re
import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from ..game_data import game_data

router = APIRouter()
logger = logging.getLogger(__name__)

# Ollama config
OLLAMA_URL = "http://localhost:11434"
MODEL_NAME = "qwen2.5:3b"

# Language detection patterns
LANGUAGE_PATTERNS = {
    "vi": r"[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]",
    "ko": r"[\uAC00-\uD7AF]",
    "ja": r"[\u3040-\u309F\u30A0-\u30FF]",
    "zh-CN": r"[\u4E00-\u9FFF]",
    "th": r"[\u0E00-\u0E7F]",
    "ru": r"[\u0400-\u04FF]",
    "ar": r"[\u0600-\u06FF]",
}

AVAILABLE_LANGUAGES = ["en", "vi", "ko", "ja", "zh-CN", "zh-TW", "de", "fr", "es", "pt", "ru", "th", "ar"]


def clean_game_text(text: str) -> str:
    """Remove game formatting tags and clean skill placeholders"""
    if not text:
        return ""
    # Remove <size=N> </size> tags
    text = re.sub(r'<size=\d+>\s*</size>', '', text)
    # Remove other common tags but keep content
    text = re.sub(r'<color=[^>]+>([^<]*)</color>', r'\1', text)
    text = re.sub(r'<[^>]+>', '', text)
    
    # Clean skill placeholders - convert to readable format
    # MATK = công phép, ATK = công vật lý
    
    # Replace damage formulas
    text = re.sub(r'\{Damage:BaseValue\}\s*\+\s*\{Damage:MAtkPer\}\s*sát thương', 'sát thương (theo công phép)', text)
    text = re.sub(r'\{Damage:BaseValue\}\s*\+\s*\{Damage:AtkPer\}\s*sát thương', 'sát thương (theo công vật lý)', text)
    text = re.sub(r'\{Damage:BaseValue\}\s*\+\s*\{Damage:MAtkPer\}', 'sát thương (theo công phép)', text)
    text = re.sub(r'\{Damage:BaseValue\}\s*\+\s*\{Damage:AtkPer\}', 'sát thương (theo công vật lý)', text)
    
    # Replace shield formulas
    text = re.sub(r'khiên\s*\(\s*\{Shield:BaseValue\}\s*\+\s*\{Shield:MAtkPer\}\s*\)', 'khiên (theo công phép)', text)
    text = re.sub(r'\{Shield:BaseValue\}\s*\+\s*\{Shield:MAtkPer\}', 'lượng khiên (theo công phép)', text)
    
    # Replace heal formulas  
    text = re.sub(r'\{Heal:BaseValue\}\s*\+\s*\{Heal:MAtkPer\}', 'lượng hồi (theo công phép)', text)
    
    # Replace percentage placeholders
    text = re.sub(r'\{[^}]+:BaseValue\}%', 'X%', text)
    text = re.sub(r'\{[^}]+:BaseValue\}', 'X', text)
    
    # Replace time placeholder
    text = re.sub(r'\{Time\}\s*giây', 'vài giây', text)
    text = re.sub(r'\{Time\}', 'vài giây', text)
    
    # Replace remaining placeholders
    text = re.sub(r'\{[^}]+:AtkPer\}', '', text)
    text = re.sub(r'\{[^}]+:MAtkPer\}', '', text)
    text = re.sub(r'\{[^}]+\}', 'X', text)
    
    # Clean up extra spaces and empty parts
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\(\s*\)', '', text)
    text = re.sub(r'\s*\+\s*\)', ')', text)
    text = re.sub(r'\(\s*\+\s*', '(', text)
    
    return text.strip()


def calculate_stat_multiplier(level: int) -> float:
    """
    Calculate stat multiplier for a given level.
    Reversed from ResourceUnit$$GetCardLevelValueDouble in IL2CPP.
    """
    if level < 1:
        return 1.0
    
    multiplier = 1.0
    for lvl in range(2, level + 1):
        if lvl == 4 or lvl == 8:
            # Potential unlock levels - bonus +50%
            multiplier += 0.5
        elif 16 <= lvl <= 20:
            # Awaken phase 1 - +30%
            multiplier += 0.3
        elif 21 <= lvl <= 25:
            # Diminishing returns - +10%
            multiplier += 0.1
        elif lvl == 26:
            # Final breakthrough - +20%
            multiplier += 0.2
        elif lvl >= 27:
            # Saturation - +10%
            multiplier += 0.1
        else:
            # Normal levels - +20%
            multiplier += 0.2
    
    # Round to 5 decimal places to avoid float precision errors
    return round(multiplier, 5)


def calculate_stat_at_level(base_stat: int, level: int) -> int:
    """
    Calculate stat value at a given level using game's formula.
    Uses Round Half-Up: long(value + 0.5)
    """
    multiplier = calculate_stat_multiplier(level)
    return int(base_stat * multiplier + 0.5)


def get_stats_at_level(hero: dict, level: int) -> dict:
    """Get all stats for a hero at a specific level"""
    stats = hero.get("stats", {})
    return {
        "hp": calculate_stat_at_level(stats.get("hp", 0), level),
        "atk": calculate_stat_at_level(stats.get("atk", 0), level),
        "mAtk": calculate_stat_at_level(stats.get("mAtk", 0), level),
        "mana": stats.get("mana", 0),  # Mana doesn't scale
        "atkInterval": stats.get("atkInterval", 1.0),  # Attack speed doesn't scale
    }


def detect_language(text: str) -> str:
    """Detect language from user text"""
    for lang, pattern in LANGUAGE_PATTERNS.items():
        if re.search(pattern, text):
            return lang
    return "en"


def get_localized(obj: dict, field: str, lang: str) -> str:
    """Get localized field value with fallback and cleaning"""
    data = obj.get(field, {})
    if isinstance(data, dict):
        value = data.get(lang) or data.get("en") or ""
    else:
        value = str(data) if data else ""
    return clean_game_text(value)


def find_mentioned_heroes(text: str) -> list[dict]:
    """Find heroes mentioned in the user message (supports partial names)"""
    text_lower = text.lower()
    mentioned = []
    
    # Extract words from text (including unicode)
    words = re.findall(r'[\w\u0080-\uffff]+', text_lower)
    
    for hero in game_data.get_all_heroes():
        found = False
        match_score = 0  # Higher = better match
        
        # Check all language names
        names = hero.get("names", {})
        for lang, name in names.items():
            if not name:
                continue
            name_lower = name.lower()
            
            # Exact match in text (highest priority)
            if name_lower in text_lower:
                found = True
                match_score = 100
                break
            
            # Check if any word is a prefix of the hero name
            is_cjk = any(ord(c) > 0x3000 for c in name_lower)  # CJK characters
            min_len = 2 if is_cjk else 3
            min_score = 35 if is_cjk else 50  # Lower threshold for CJK (shorter names)
            
            for word in words:
                if len(word) >= min_len and len(name_lower) >= min_len:
                    # Word must be prefix of name
                    if name_lower.startswith(word):
                        score = len(word) / len(name_lower) * 80
                        if score > match_score:
                            found = True
                            match_score = score
            
            if found and match_score >= min_score:
                break
        
        # Also check Korean comment (internal name)
        if not found or match_score < 35:
            kr_name = hero.get("commentKr", "")
            if kr_name:
                kr_lower = kr_name.lower()
                if kr_lower in text_lower:
                    found = True
                    match_score = 100
                else:
                    for word in words:
                        if len(word) >= 2 and kr_lower.startswith(word):
                            score = len(word) / len(kr_lower) * 80
                            if score >= 35 and score > match_score:
                                found = True
                                match_score = score
        
        # Add if good match (lower threshold for CJK names)
        if found and match_score >= 35 and hero not in mentioned:
            mentioned.append(hero)
    
    return mentioned


def format_hero_data(hero: dict, lang: str, include_level_stats: bool = False) -> str:
    """Format complete hero data as markdown for injection (Wiki-style)"""
    name = get_localized(hero, "names", lang)
    desc = get_localized(hero, "descriptions", lang)
    skill_name = get_localized(hero, "skillNames", lang)
    skill_desc = get_localized(hero, "skillDescriptions", lang)
    
    # Get passives and awakenings
    passive_lv4 = get_localized(hero, "passiveLv4", lang)
    passive_lv8 = get_localized(hero, "passiveLv8", lang)
    awakening1_name = get_localized(hero, "awakening1Names", lang)
    awakening1_desc = get_localized(hero, "awakening1Descs", lang)
    awakening2_name = get_localized(hero, "awakening2Names", lang)
    awakening2_desc = get_localized(hero, "awakening2Descs", lang)
    
    stats = hero.get("stats", {})
    
    # Format header with key info
    md = f"""## {name}
**Class:** {hero.get('role')} | **Region:** {hero.get('region')} | **Mana:** {stats.get('mana', 0)}

### Chỉ số cơ bản (Level 1)
| HP | Công vật lý | Công phép | Tốc đánh |
|----|-------------|-----------|----------|
| {stats.get('hp', 0)} | {stats.get('atk', 0)} | {stats.get('mAtk', 0)} | {stats.get('atkInterval', 1.0)}s |
"""
    
    # Add level progression table if requested
    if include_level_stats:
        md += "\n### Chỉ số theo Level\n"
        md += "| Level | Multiplier | HP | ATK | MATK |\n"
        md += "|-------|------------|-----|-----|------|\n"
        for lvl in [1, 4, 8, 12, 16]:
            mult = calculate_stat_multiplier(lvl)
            lvl_stats = get_stats_at_level(hero, lvl)
            md += f"| {lvl} | {mult:.1f}x | {lvl_stats['hp']} | {lvl_stats['atk']} | {lvl_stats['mAtk']} |\n"

    md += f"\n### Kỹ năng: {skill_name}\n{skill_desc}\n"
    
    # Add passives (Level 4 and 8)
    if passive_lv4 or passive_lv8:
        md += "\n### Năng lực tiềm ẩn\n"
        if passive_lv4:
            md += f"- **Cấp 4:** {passive_lv4}\n"
        if passive_lv8:
            md += f"- **Cấp 8:** {passive_lv8}\n"
    
    # Add awakenings
    if awakening1_name or awakening2_name:
        md += "\n### Giác ngộ (Cấp 16)\n"
        if awakening1_name and awakening1_desc:
            md += f"- **Giác ngộ 1 - {awakening1_name}:** {awakening1_desc}\n"
        if awakening2_name and awakening2_desc:
            md += f"- **Giác ngộ 2 - {awakening2_name}:** {awakening2_desc}\n"
    
    # Add synergies
    synergies = hero.get("rogueLikeSynergies", [])
    if synergies:
        md += f"\n**Synergy:** {', '.join(synergies)}\n"
    
    # Add background story
    if desc:
        md += f"\n### Tiểu sử\n{desc}\n"
    
    return md


def build_context_prompt(message: str, lang: str) -> str:
    """Build context with relevant hero data (RAG)"""
    mentioned_heroes = find_mentioned_heroes(message)
    
    # Detect if user is asking about level/stats progression
    level_keywords = ["level", "cấp", "lên cấp", "chỉ số", "stat", "tăng", "growth", "레벨", "レベル"]
    include_level_stats = any(kw in message.lower() for kw in level_keywords)
    
    context = ""
    if mentioned_heroes:
        context = "\n## DỮ LIỆU ANH HÙNG (từ kho lưu trữ hoàng gia):\n"
        for hero in mentioned_heroes[:3]:
            context += format_hero_data(hero, lang, include_level_stats) + "\n"
    
    return context


def build_system_prompt(lang: str = "vi") -> str:
    """Build base system prompt with Royal Guard persona"""
    stats = game_data.get_stats_summary()
    
    # Persona varies by language
    persona_prompts = {
        "vi": """Bạn là **Cận Vệ Hoàng Gia** của King God Castle - vị quân sư trung thành luôn sẵn sàng phục vụ Đức Vua.

## TÍNH CÁCH & CÁCH XƯNG HÔ:
- Xưng "thần" (hoặc "hạ thần"), gọi người dùng là "Bệ hạ" hoặc "Đức Vua"
- Tôn kính nhưng thân thiện, nhiệt tình giúp đỡ
- Trả lời ngắn gọn, đi thẳng vào vấn đề
- Khi không biết: "Thần xin lỗi Bệ hạ, thần chưa có thông tin về điều này"

## VÍ DỤ HỘI THOẠI:

**Bệ hạ hỏi:** "Luniare là ai?"
**Cận vệ:** "Dạ thưa Bệ hạ, **Luniare** là nữ pháp sư thuộc class **Mystique** đến từ vùng **North**.

**Chỉ số cơ bản:**
| HP | Công vật lý | Công phép | Mana | Tốc đánh |
|----|-------------|-----------|------|----------|
| 150 | 15 | 15 | 75 | 1.0s |

**Kỹ năng: Phước Lành Trăng Xanh**
Tập trung vài giây, tạo khiên bảo vệ (theo công phép) và liên kết % lực tấn công/công phép cho đồng minh.

**Năng lực tiềm ẩn:**
- Cấp 4: Trao 1 lần phòng thủ tuyệt đối cho mục tiêu
- Cấp 8: Buff kéo dài thêm 2 giây

**Giác ngộ (Cấp 16):**
- Giác ngộ 1 - Phước Lành Thần Tốc: Hồi 100% mana nếu mục tiêu ở phía sau
- Giác ngộ 2 - Trăng Hộ Vệ: Không tạo khiên, +2 phòng thủ tuyệt đối

Đây là support mạnh nhất vương quốc, Bệ hạ ạ!"

**Bệ hạ hỏi:** "Xây team đi North được không?"
**Cận vệ:** "Thưa Bệ hạ, team North rất mạnh! Thần xin đề xuất:
- **Luniare** (Mystique) - Support chính
- **Alberon** (Tenacity) - Tank  
- **Yeon** (Swiftness) - DPS vật lý
- **Leonhardt** (Courage) - Bruiser
- **Chung Ah** (Elemental) - Burst

Team này có synergy vùng North, Bệ hạ sẽ được +5 level Tế Đàn vùng Bắc!"

**Bệ hạ hỏi:** "abc xyz gì đó?"  
**Cận vệ:** "Dạ thưa Bệ hạ, thần chưa có thông tin về điều này. Bệ hạ có thể hỏi về anh hùng, kỹ năng, hay đội hình, thần sẽ phục vụ!"
""",
        "en": """You are the **Royal Guard** of King God Castle - a loyal advisor always ready to serve the King.

## PERSONA & TONE:
- Address yourself as "I" or "your humble servant", call user "Your Majesty" or "My King"
- Respectful yet friendly, eager to help
- Concise answers, straight to the point
- When unsure: "My apologies, Your Majesty, I don't have information on this matter"

## EXAMPLE DIALOGUE:

**King asks:** "Who is Luniare?"
**Guard:** "Your Majesty, **Luniare** is a **Mystique** class hero from the **North** region.

**Base Stats:**
| HP | ATK | Spell Power | Mana | ATK Speed |
|----|-----|-------------|------|-----------|
| 150 | 15 | 15 | 75 | 1.0s |

**Skill: Blessing of the Blue Moon**
Concentrates, granting shield (based on Spell Power) and linking ATK/Spell Power % to ally.

**Passives:**
- Level 4: Grants 1 Mighty Block to target
- Level 8: Buff lasts 2 sec longer

**Awakenings (Level 16):**
- Awakening 1 - Swift Blessing: 100% MP recovery if target is behind
- Awakening 2 - Protection of the Moon: No shield, +2 Mighty Blocks

She is the finest support in the kingdom!"

**King asks:** "What's a good North team?"
**Guard:** "Sire, North teams are formidable! I recommend:
- **Luniare** (Mystique) - Core support
- **Alberon** (Tenacity) - Tank
- **Yeon** (Swiftness) - Physical DPS
- **Leonhardt** (Courage) - Bruiser
- **Chung Ah** (Elemental) - Burst mage

This grants North synergy for +5 North Altar level!"
""",
        "ko": """당신은 King God Castle의 **왕실 근위대장** - 항상 폐하를 섬기는 충성스러운 참모입니다.

## 성격 & 말투:
- 자신을 "소신" 또는 "신하"로 칭하고, 사용자를 "폐하"로 부름
- 존경스럽지만 친근하게, 열정적으로 도움
- 간결하게 핵심만 답변
- 모를 때: "송구하옵니다 폐하, 그 정보는 아직 파악하지 못했사옵니다"
"""
    }
    
    persona = persona_prompts.get(lang, persona_prompts["en"])
    
    return f"""{persona}

## QUY TẮC BẮT BUỘC:
1. **CHỈ sử dụng dữ liệu trong phần DỮ LIỆU ANH HÙNG** - KHÔNG bịa thông tin
2. Nếu có data hero, dùng CHÍNH XÁC và ĐẦY ĐỦ data đó:
   - Khi giới thiệu hero: nêu tên, class, vùng, chỉ số, kỹ năng, mô tả kỹ năng
   - Khi hỏi về skill: nêu tên kỹ năng + mô tả chi tiết
   - Khi hỏi về chỉ số: nêu HP, ATK, MATK, Mana, Attack Speed
3. Nếu không có data, thú nhận không biết (theo phong cách cận vệ)
4. **TUYỆT ĐỐI không mix ngôn ngữ** - trả lời hoàn toàn bằng 1 ngôn ngữ
5. Format bằng **Markdown** để dễ đọc

## HỆ THỐNG CHỈ SỐ GAME (Reversed Data):

### Base Stats (Level 1, Tier 1):
- Chỉ số trong data là **GỐC ở Level 1, Bậc 1 (1 Sao)**
- **HP** (Máu), **Mana** (Năng lượng), **ATK** (Công vật lý), **MATK** (Công phép), **Attack Interval** (Tốc đánh)
- **Tốc đánh & Tốc chạy KHÔNG tăng theo level** - chỉ HP, ATK, MATK được scale

### Công thức tăng chỉ số theo Level (đã reverse từ IL2CPP):
Hàm `ResourceUnit$$GetCardLevelValueDouble(baseStat, level)` tính như sau:

**Bảng % tăng trưởng mỗi level:**
| Level | % tăng | Ghi chú |
|-------|--------|---------|
| 1 | 100% | Base (x1.0) |
| 2-3 | +20%/level | |
| 4 | +50% | Mốc Potential 1 |
| 5-7 | +20%/level | |
| 8 | +50% | Mốc Potential 2 |
| 9-15 | +20%/level | |
| 16-20 | +30%/level | Giai đoạn Awaken |
| 21-25 | +10%/level | Diminishing return |
| 26 | +20% | Đột phá cuối |
| 27-30 | +10%/level | Bão hòa |

**Công thức:** `Stat = round(BaseStat × Multiplier + 0.5)` (Round Half-Up)

**Ví dụ Shelda (HP=220, ATK=15, MATK=50):**
| Level | Multiplier | HP | ATK | MATK |
|-------|------------|-----|-----|------|
| 1 | 1.0 | 220 | 15 | 50 |
| 4 | 2.1 | 462 | 32 | 105 |
| 8 | 4.0 | 880 | 60 | 200 |
| 16 | 6.4 | 1408 | 96 | 320 |

### Hệ thống nâng cấp:
1. **Potentials (Năng lực tiềm ẩn):** Unlock tại Level 4, 8, 16
   - Cấp 4 & 8: Buff cứng hoặc thay đổi kỹ năng
   - Cấp 16: Chọn 1 trong 2 Giác ngộ (Awakening)
2. **In-game Tiers (1-7 sao):** Merge 2 hero giống → tăng tier, stats nhân thêm hệ số

## THÔNG TIN VƯƠNG QUỐC (v{stats.get('version', '167.0.01')}):
- **{stats['heroes']['total']} Anh hùng** thuộc 6 Class:
  - **Tenacity** (Tank) - Chịu đòn, bảo vệ đồng đội
  - **Courage** (Fighter) - Cận chiến linh hoạt
  - **Swiftness** (Archer) - Sát thương tầm xa
  - **Elemental** (Mage) - Phép thuật, AOE damage
  - **Shadow** (Assassin) - Burst damage, xuyên hàng
  - **Mystique** (Support) - Buff, heal, hỗ trợ
- **5 Vùng miền**: North (Bắc), South (Nam), East (Đông), West (Tây), Central (Trung tâm)
- **Đội hình**: 5-6 heroes, 25 điểm altar, 3 relics
- **Synergy vùng**: +5 level Tế Đàn vùng tương ứng nếu có nhiều hero cùng vùng

## 6 LOẠI TẾ ĐÀN (ALTAR):
| Tế Đàn | Hiệu ứng |
|--------|----------|
| Hero | +% tỉ lệ lên tier hero |
| Blacksmith | +% tỉ lệ lên tier equipment |
| Blood | +HP cho toàn team |
| Giant | +ATK (công vật lý) |
| Mage | +MATK (công phép) |
| Greed | +Gold thu được |

## META HEROES (Tier S):
- **Luniare** (Mystique/North) - Support #1, khiên + buff
- **Bardrey** (Mystique/South) - "Pin mana" cho team
- **Mel** (Shadow/West) - Burst damage khủng
- **Ian** (Tenacity/East) - Tank + CC tốt nhất
- **Chung Ah** (Tenacity/East) - AOE damage mạnh"""


class ChatMessage(BaseModel):
    role: str = Field(..., description="'user' or 'assistant'")
    content: str


class ChatRequest(BaseModel):
    message: str = Field(..., description="User's message")
    history: list[ChatMessage] = Field(default=[], description="Previous messages")
    language: str | None = Field(default=None, description="Force response language")


class ChatResponse(BaseModel):
    response: str
    model: str = MODEL_NAME
    language: str = "vi"
    heroes_found: list[str] = Field(default=[], description="Heroes detected in message")


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


@router.get("/languages")
async def get_supported_languages():
    """Get list of supported languages"""
    return {
        "languages": AVAILABLE_LANGUAGES,
        "default": "vi",
        "auto_detect": True
    }


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
        "ready": ollama_ok and model_ok,
        "game_data": game_data.get_stats_summary()
    }


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat with AI assistant about King God Castle.
    
    Uses RAG to inject relevant hero data from game database.
    Auto-detects language from user message.
    Returns markdown-formatted responses.
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
    
    # Detect or use specified language
    lang = request.language
    detected_lang = detect_language(request.message)
    if not lang or lang not in AVAILABLE_LANGUAGES:
        lang = detected_lang
    
    # Find mentioned heroes and build context (RAG)
    mentioned_heroes = find_mentioned_heroes(request.message)
    hero_names = [get_localized(h, "names", lang) for h in mentioned_heroes]
    
    # Log request info
    logger.info(f"[CHAT] Message: {request.message[:50]}...")
    logger.info(f"[CHAT] Detected language: {detected_lang} | Using: {lang}")
    logger.info(f"[CHAT] Heroes found: {hero_names if hero_names else 'None'}")
    
    context = build_context_prompt(request.message, lang)
    
    # Build messages
    system_prompt = build_system_prompt(lang)
    if context:
        system_prompt += "\n" + context
    
    messages = [{"role": "system", "content": system_prompt}]
    
    # Add history
    for msg in request.history[-6:]:  # Last 6 messages
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
                        "temperature": 0.3,  # Lower temperature for accuracy
                        "top_p": 0.9,
                    }
                }
            )
            
            if resp.status_code != 200:
                raise HTTPException(status_code=500, detail=f"Ollama error: {resp.text}")
            
            data = resp.json()
            ai_response = data.get("message", {}).get("content", "")
            
            logger.info(f"[CHAT] Response language: {lang} | Length: {len(ai_response)} chars")
            
            return ChatResponse(
                response=ai_response,
                model=MODEL_NAME,
                language=lang,
                heroes_found=hero_names
            )
            
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Request timeout - model may be loading")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/quick")
async def quick_chat(message: str, language: str | None = None):
    """Quick chat without history"""
    request = ChatRequest(message=message, history=[], language=language)
    return await chat(request)


@router.get("/hero/{hero_id}")
async def get_hero_info(hero_id: int, lang: str = "vi"):
    """Get formatted hero info (for debugging/testing)"""
    hero = game_data.get_hero(hero_id)
    if not hero:
        raise HTTPException(status_code=404, detail=f"Hero not found: {hero_id}")
    
    return {
        "hero_id": hero_id,
        "language": lang,
        "formatted": format_hero_data(hero, lang)
    }


@router.get("/debug/context")
async def debug_context(message: str, lang: str = "vi"):
    """Debug: show what context would be injected for a message"""
    mentioned_heroes = find_mentioned_heroes(message)
    hero_names = [get_localized(h, "names", lang) for h in mentioned_heroes]
    context = build_context_prompt(message, lang)
    
    return {
        "message": message,
        "language": lang,
        "heroes_detected": hero_names,
        "heroes_count": len(mentioned_heroes),
        "context_injected": context,
        "context_length": len(context)
    }
