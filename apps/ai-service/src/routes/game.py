"""
Game-specific routes for KGCentral AI Service

Supports multilingual responses using official game translations.
"""
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from typing import Any

from src.game_data import game_data
from src.synergy import SynergyCalculator

router = APIRouter()

# Initialize synergy calculator
synergy_calc = SynergyCalculator(game_data)

# Available languages
AVAILABLE_LANGUAGES = ["en", "vi", "ko", "ja", "zh-CN", "zh-TW", "de", "fr", "es", "pt", "ru", "th", "ar"]


def get_localized_name(obj: dict, lang: str) -> str:
    """Get name in specified language with fallback"""
    names = obj.get("names", {})
    return names.get(lang) or names.get("en") or obj.get("nameKr", "")


def format_hero_response(hero: dict, lang: str = "en") -> dict:
    """Format hero for API response with localized names"""
    return {
        "id": hero.get("id"),
        "name": get_localized_name(hero, lang),
        "names": hero.get("names", {}),
        "region": hero.get("region"),
        "role": hero.get("role"),
        "skillName": hero.get("skillNames", {}).get(lang) or hero.get("skillNames", {}).get("en", ""),
        "skillDescription": hero.get("skillDescriptions", {}).get(lang) or hero.get("skillDescriptions", {}).get("en", ""),
        "description": hero.get("descriptions", {}).get(lang) or hero.get("descriptions", {}).get("en", ""),
        "stats": hero.get("stats"),
    }


class TeamCompositionRequest(BaseModel):
    """Request for team synergy calculation"""

    hero_ids: list[int] = Field(..., min_length=5, max_length=6, description="5-6 hero IDs")
    altar_build: dict[str, int] = Field(..., description="Altar distribution (must sum to 25)")
    relic_ids: list[int] = Field(default=[], description="Up to 3 relic IDs")
    language: str = Field(default="en", description="Response language")


class TeamSynergyResponse(BaseModel):
    """Response with synergy analysis"""

    total_score: float = Field(..., description="Overall synergy score (0-100)")
    grade: str = Field(..., description="Letter grade (S+, S, A, B, C, D)")
    breakdown: dict[str, Any] = Field(..., description="Detailed breakdown by category")
    recommendations: list[str] = Field(..., description="Suggestions to improve team")


@router.get("/languages")
async def get_supported_languages():
    """Get list of supported languages for game data"""
    return {
        "languages": AVAILABLE_LANGUAGES,
        "default": "en"
    }


@router.get("/stats")
async def get_stats():
    """Get game data statistics"""
    return game_data.get_stats_summary()


@router.get("/heroes")
async def get_heroes(
    region: str = Query(None, description="Filter by region"),
    role: str = Query(None, description="Filter by role/class"),
    lang: str = Query("en", description="Language for names")
):
    """Get all available heroes with localized names"""
    heroes = game_data.get_all_heroes()
    
    if region:
        heroes = [h for h in heroes if h.get("region", "").lower() == region.lower()]
    if role:
        heroes = [h for h in heroes if h.get("role", "").lower() == role.lower()]
    
    return {
        "total": len(heroes),
        "language": lang,
        "heroes": [format_hero_response(hero, lang) for hero in heroes],
    }


@router.get("/heroes/region/{region}")
async def get_heroes_by_region(region: str, lang: str = Query("en", description="Language")):
    """Get heroes by region (East, West, South, North, Central)"""
    heroes = game_data.get_heroes_by_region(region)
    return {
        "region": region,
        "count": len(heroes),
        "language": lang,
        "heroes": [format_hero_response(hero, lang) for hero in heroes],
    }


@router.get("/heroes/role/{role}")
async def get_heroes_by_role(role: str, lang: str = Query("en", description="Language")):
    """Get heroes by role/class (Tenacity, Courage, Swiftness, Elemental, Shadow, Mystique)"""
    heroes = game_data.get_heroes_by_role(role)
    return {
        "role": role,
        "count": len(heroes),
        "language": lang,
        "heroes": [format_hero_response(hero, lang) for hero in heroes],
    }


@router.get("/heroes/{hero_id}")
async def get_hero(hero_id: int, lang: str = Query("en", description="Language")):
    """Get detailed hero information with all localized data"""
    hero = game_data.get_hero(hero_id)
    if not hero:
        raise HTTPException(status_code=404, detail=f"Hero not found: {hero_id}")
    
    # Return full hero data with all languages
    response = format_hero_response(hero, lang)
    response["fullData"] = hero  # Include complete data for detailed view
    return response


@router.get("/heroes/search/{name}")
async def search_hero(name: str, lang: str = Query("en", description="Language")):
    """Search hero by name (any language)"""
    hero = game_data.get_hero_by_name(name)
    if not hero:
        raise HTTPException(status_code=404, detail=f"Hero not found: {name}")
    return format_hero_response(hero, lang)


@router.get("/relics")
async def get_relics(
    type: str = Query(None, description="Filter by type"),
    lang: str = Query("en", description="Language")
):
    """Get all available artifacts/relics with localized names"""
    relics = game_data.get_all_relics()
    
    if type:
        relics = [r for r in relics if r.get("type", "").lower() == type.lower()]
    
    return {
        "total": len(relics),
        "language": lang,
        "relics": [
            {
                "id": relic.get("id"),
                "name": get_localized_name(relic, lang),
                "names": relic.get("names", {}),
                "type": relic.get("type"),
                "level": relic.get("level"),
                "description": relic.get("descriptions", {}).get(lang) or relic.get("descriptions", {}).get("en", ""),
            }
            for relic in relics
        ],
    }


@router.get("/relics/{relic_id}")
async def get_relic(relic_id: int, lang: str = Query("en", description="Language")):
    """Get detailed relic information"""
    relic = game_data.get_relic(relic_id)
    if not relic:
        raise HTTPException(status_code=404, detail=f"Relic not found: {relic_id}")
    
    return {
        "id": relic.get("id"),
        "name": get_localized_name(relic, lang),
        "names": relic.get("names", {}),
        "type": relic.get("type"),
        "level": relic.get("level"),
        "descriptions": relic.get("descriptions", {}),
        "fullData": relic,
    }


@router.get("/altars")
async def get_altars(lang: str = Query("en", description="Language")):
    """Get all altars/buildings with localized names"""
    altars = game_data.get_all_altars()
    return {
        "total": len(altars),
        "language": lang,
        "altars": [
            {
                "id": altar.get("id"),
                "name": get_localized_name(altar, lang),
                "names": altar.get("names", {}),
                "type": altar.get("type"),
                "descriptions": altar.get("descriptions", {}),
            }
            for altar in altars
        ],
    }


@router.get("/altars/{altar_id}")
async def get_altar(altar_id: int, lang: str = Query("en", description="Language")):
    """Get detailed altar information"""
    altar = game_data.get_altar(altar_id)
    if not altar:
        raise HTTPException(status_code=404, detail=f"Altar not found: {altar_id}")
    
    return {
        "id": altar.get("id"),
        "name": get_localized_name(altar, lang),
        "names": altar.get("names", {}),
        "fullData": altar,
    }


@router.get("/equipment")
async def get_equipment(
    type: str = Query(None, description="Filter by equipType"),
    lang: str = Query("en", description="Language")
):
    """Get all equipment items"""
    equipment = game_data.get_all_equipment()
    
    if type:
        equipment = [e for e in equipment if e.get("equipType", "").lower() == type.lower()]
    
    return {
        "total": len(equipment),
        "language": lang,
        "equipment": equipment[:50],
        "note": "Showing first 50 items. Use type filter for specific equipment."
    }


@router.get("/synergies")
async def get_synergies(lang: str = Query("en", description="Language")):
    """Get all synergy data with localized names"""
    synergies = game_data.get_all_synergies()
    return {
        "total": len(synergies),
        "language": lang,
        "synergies": [
            {
                "id": s.get("id"),
                "name": get_localized_name(s, lang),
                "names": s.get("names", {}),
                "description": s.get("descriptions", {}).get(lang) or s.get("descriptions", {}).get("en", ""),
                "condition": s.get("condition"),
            }
            for s in synergies
        ],
    }


@router.post("/team/analyze", response_model=TeamSynergyResponse)
async def analyze_team(request: TeamCompositionRequest):
    """
    Analyze team composition and calculate synergy score

    Returns synergy analysis with:
    - Total score (0-100)
    - Grade (S+, S, A, B, C, D)
    - Breakdown by category (region, class, altar, relic)
    - Recommendations for improvement (localized if language specified)
    """
    try:
        result = synergy_calc.calculate_team_synergy(
            hero_ids=request.hero_ids,
            altar_build=request.altar_build,
            relic_ids=request.relic_ids,
        )

        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])

        return TeamSynergyResponse(**result)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/team/example")
async def get_example_team():
    """Get an example team composition for testing"""
    heroes = game_data.get_all_heroes()
    relics = game_data.get_all_relics()

    if len(heroes) < 6:
        return {
            "message": "Not enough heroes loaded.",
            "heroes_available": len(heroes),
            "heroes_needed": 6,
        }

    example_heroes = [10230, 10090, 10210, 10480, 10510, 10000]

    return {
        "hero_ids": example_heroes,
        "altar_build": {
            "hero": 5,
            "blackSmith": 5,
            "blood": 5,
            "giant": 5,
            "mage": 5,
            "greed": 0,
        },
        "relic_ids": [],
        "note": "This is a meta team composition. Use with POST /game/team/analyze",
    }
