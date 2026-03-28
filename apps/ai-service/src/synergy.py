"""
Team Synergy Calculator

Calculate synergy scores for team compositions
"""
from typing import Any


class SynergyCalculator:
    """Calculate team synergy scores"""

    def __init__(self, game_data):
        self.game_data = game_data

    def calculate_team_synergy(
        self,
        hero_ids: list[str],
        altar_build: dict[str, int],
        relic_ids: list[str],
    ) -> dict[str, Any]:
        """
        Calculate synergy score for a team composition

        Args:
            hero_ids: List of 6 hero IDs
            altar_build: Dict of altar type -> level (total 25 points)
            relic_ids: List of 3 relic IDs

        Returns:
            Synergy analysis with score and breakdown
        """
        # Validate inputs
        if len(hero_ids) != 6:
            return {"error": "Team must have exactly 6 heroes"}

        if len(relic_ids) != 3:
            return {"error": "Team must have exactly 3 relics"}

        altar_total = sum(altar_build.values())
        if altar_total != 25:
            return {"error": f"Altar points must total 25 (got {altar_total})"}

        # Load heroes
        heroes = []
        for hero_id in hero_ids:
            hero = self.game_data.get_hero(hero_id)
            if not hero:
                return {"error": f"Hero not found: {hero_id}"}
            heroes.append(hero)

        # Calculate synergy components
        region_score = self._calculate_region_synergy(heroes)
        class_score = self._calculate_class_balance(heroes)
        altar_score = self._calculate_altar_hero_match(heroes, altar_build)
        relic_score = self._calculate_relic_synergy(relic_ids)

        # Total synergy score (0-100)
        total_score = (
            region_score["score"] * 0.2  # 20% weight
            + class_score["score"] * 0.3  # 30% weight
            + altar_score["score"] * 0.3  # 30% weight
            + relic_score["score"] * 0.2  # 20% weight
        )

        return {
            "total_score": round(total_score, 2),
            "grade": self._score_to_grade(total_score),
            "breakdown": {
                "region_synergy": region_score,
                "class_balance": class_score,
                "altar_match": altar_score,
                "relic_synergy": relic_score,
            },
            "recommendations": self._generate_recommendations(
                heroes, altar_build, region_score, class_score, altar_score
            ),
        }

    def _calculate_region_synergy(self, heroes: list[dict]) -> dict:
        """Calculate region-based synergy"""
        regions = [h.get("region", "Unknown") for h in heroes]
        region_counts = {}
        for region in regions:
            region_counts[region] = region_counts.get(region, 0) + 1

        # More heroes from same region = higher synergy
        max_same_region = max(region_counts.values())
        score = min(100, max_same_region * 20)  # 2 same = 40, 3 same = 60, etc.

        return {
            "score": score,
            "distribution": region_counts,
            "dominant_region": max(region_counts, key=region_counts.get) if region_counts else None,
        }

    def _calculate_class_balance(self, heroes: list[dict]) -> dict:
        """Calculate class balance (Tank/DPS/Support)"""
        classes = [h.get("class", "Unknown") for h in heroes]
        class_counts = {}
        for cls in classes:
            class_counts[cls] = class_counts.get(cls, 0) + 1

        # Ideal: 2 Tank, 3 DPS, 1 Support (example)
        # For now, just check we have variety
        unique_classes = len(class_counts)
        score = min(100, unique_classes * 25)  # 2 classes = 50, 3 = 75, 4 = 100

        return {"score": score, "distribution": class_counts, "variety": unique_classes}

    def _calculate_altar_hero_match(self, heroes: list[dict], altar_build: dict) -> dict:
        """Calculate how well altar build matches hero needs"""
        # Simple heuristic: check if altar build matches team composition
        score = 70  # Base score

        # If Blood altar is high and we have DPS heroes, good match
        if altar_build.get("blood", 0) >= 10:
            dps_count = sum(1 for h in heroes if "DPS" in h.get("class", "").upper())
            if dps_count >= 3:
                score += 15

        # If Giant altar is high and we have tanks, good match
        if altar_build.get("giant", 0) >= 10:
            tank_count = sum(1 for h in heroes if "TANK" in h.get("class", "").upper() or "WARRIOR" in h.get("class", "").upper())
            if tank_count >= 2:
                score += 15

        # If Mage altar is high and we have mages, good match
        if altar_build.get("mage", 0) >= 10:
            mage_count = sum(1 for h in heroes if "MAGE" in h.get("class", "").upper())
            if mage_count >= 2:
                score += 15

        return {"score": min(100, score), "altar_build": altar_build}

    def _calculate_relic_synergy(self, relic_ids: list[str]) -> dict:
        """Calculate relic synergy"""
        relics = []
        for relic_id in relic_ids:
            relic = self.game_data.get_relic(relic_id)
            if relic:
                relics.append(relic)

        # If we have 3 relics loaded, good; otherwise penalize
        score = (len(relics) / 3.0) * 100

        relic_types = [r.get("type", "Unknown") for r in relics]
        return {"score": score, "types": relic_types, "loaded_count": len(relics)}

    def _score_to_grade(self, score: float) -> str:
        """Convert numerical score to letter grade"""
        if score >= 90:
            return "S+"
        elif score >= 80:
            return "S"
        elif score >= 70:
            return "A"
        elif score >= 60:
            return "B"
        elif score >= 50:
            return "C"
        else:
            return "D"

    def _generate_recommendations(
        self,
        heroes: list[dict],
        altar_build: dict,
        region_score: dict,
        class_score: dict,
        altar_score: dict,
    ) -> list[str]:
        """Generate recommendations to improve team"""
        recommendations = []

        # Region synergy
        if region_score["score"] < 60:
            recommendations.append(
                f"Consider adding more heroes from {region_score['dominant_region']} region for synergy bonus"
            )

        # Class balance
        if class_score["variety"] < 3:
            recommendations.append("Add more class variety (Tank/DPS/Support) for better balance")

        # Altar optimization
        blood_level = altar_build.get("blood", 0)
        giant_level = altar_build.get("giant", 0)
        mage_level = altar_build.get("mage", 0)

        if blood_level < 5 and giant_level < 5:
            recommendations.append("Increase Blood or Giant altar for better survivability")

        if len(recommendations) == 0:
            recommendations.append("Great team composition! Consider fine-tuning positioning on the 7x4 board.")

        return recommendations
