"""
Game-specific routes for KGCentral AI Service
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Any

from src.game_data import game_data
from src.synergy import SynergyCalculator

router = APIRouter()

# Initialize synergy calculator
synergy_calc = SynergyCalculator(game_data)


class TeamCompositionRequest(BaseModel):
    """Request for team synergy calculation"""

    hero_ids: list[str] = Field(..., min_length=6, max_length=6, description="Exactly 6 hero IDs")
    altar_build: dict[str, int] = Field(..., description="Altar distribution (must sum to 25)")
    relic_ids: list[str] = Field(..., min_length=3, max_length=3, description="Exactly 3 relic IDs")


class TeamSynergyResponse(BaseModel):
    """Response with synergy analysis"""

    total_score: float = Field(..., description="Overall synergy score (0-100)")
    grade: str = Field(..., description="Letter grade (S+, S, A, B, C, D)")
    breakdown: dict[str, Any] = Field(..., description="Detailed breakdown by category")
    recommendations: list[str] = Field(..., description="Suggestions to improve team")


@router.get("/heroes")
async def get_heroes():
    """Get all available heroes"""
    heroes = game_data.get_all_heroes()
    return {
        "total": len(heroes),
        "heroes": [
            {
                "id": hero["id"],
                "name": hero.get("name"),
                "nameVi": hero.get("nameVi"),
                "region": hero.get("region"),
                "class": hero.get("class"),
            }
            for hero in heroes.values()
        ],
    }


@router.get("/heroes/region/{region}")
async def get_heroes_by_region(region: str):
    """Get heroes by region (East, West, South, North, Central)"""
    heroes = game_data.get_heroes_by_region(region)
    return {
        "region": region,
        "count": len(heroes),
        "heroes": [
            {
                "id": hero["id"],
                "name": hero.get("name"),
                "nameVi": hero.get("nameVi"),
                "class": hero.get("class"),
            }
            for hero in heroes
        ],
    }


@router.get("/heroes/{hero_id}")
async def get_hero(hero_id: str):
    """Get detailed hero information"""
    hero = game_data.get_hero(hero_id)
    if not hero:
        raise HTTPException(status_code=404, detail=f"Hero not found: {hero_id}")
    return hero


@router.get("/relics")
async def get_relics():
    """Get all available relics"""
    relics = game_data.get_all_relics()
    return {
        "total": len(relics),
        "relics": [
            {
                "id": relic["id"],
                "name": relic.get("name"),
                "nameVi": relic.get("nameVi"),
                "type": relic.get("type"),
            }
            for relic in relics.values()
        ],
    }


@router.get("/relics/{relic_id}")
async def get_relic(relic_id: str):
    """Get detailed relic information"""
    relic = game_data.get_relic(relic_id)
    if not relic:
        raise HTTPException(status_code=404, detail=f"Relic not found: {relic_id}")
    return relic


@router.post("/team/analyze", response_model=TeamSynergyResponse)
async def analyze_team(request: TeamCompositionRequest):
    """
    Analyze team composition and calculate synergy score

    Returns synergy analysis with:
    - Total score (0-100)
    - Grade (S+, S, A, B, C, D)
    - Breakdown by category (region, class, altar, relic)
    - Recommendations for improvement
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
    # Find available heroes
    heroes = list(game_data.get_all_heroes().values())
    relics = list(game_data.get_all_relics().values())

    if len(heroes) < 6:
        return {
            "message": "Not enough heroes loaded. Please add hero JSON files to docs/game-data/heroes/",
            "heroes_available": len(heroes),
            "heroes_needed": 6,
        }

    if len(relics) < 3:
        return {
            "message": "Not enough relics loaded. Please add relic JSON files to docs/game-data/relics/",
            "relics_available": len(relics),
            "relics_needed": 3,
        }

    # Create example team
    example_heroes = [h["id"] for h in heroes[:6]]
    example_relics = [r["id"] for r in relics[:3]]

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
        "relic_ids": example_relics,
        "note": "This is an example team. Modify and use with POST /game/team/analyze",
    }
