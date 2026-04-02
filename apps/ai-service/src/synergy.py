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
        hero_ids: list[int],
        altar_build: dict[str, int],
        relic_ids: list[int] = None,
    ) -> dict[str, Any]:
        """
        Calculate synergy score for a team composition

        Args:
            hero_ids: List of 5-6 hero IDs
            altar_build: Dict of altar type -> level (total 25 points)
            relic_ids: List of up to 3 relic IDs (optional)

        Returns:
            Synergy analysis with score and breakdown
        """
        if relic_ids is None:
            relic_ids = []
            
        # Validate inputs
        if len(hero_ids) < 5 or len(hero_ids) > 6:
            return {"error": "Team must have 5-6 heroes"}

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
        if relic_ids:
            total_score = (
                region_score["score"] * 0.25  # 25% weight
                + class_score["score"] * 0.30  # 30% weight
                + altar_score["score"] * 0.30  # 30% weight
                + relic_score["score"] * 0.15  # 15% weight
            )
        else:
            total_score = (
                region_score["score"] * 0.30  # 30% weight
                + class_score["score"] * 0.35  # 35% weight
                + altar_score["score"] * 0.35  # 35% weight
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

        # More heroes from same region = higher synergy (altar bonus)
        max_same_region = max(region_counts.values()) if region_counts else 0
        
        # Score based on region synergy tiers
        if max_same_region >= 5:
            score = 100  # Full region synergy
        elif max_same_region >= 4:
            score = 85
        elif max_same_region >= 3:
            score = 70
        elif max_same_region >= 2:
            score = 50
        else:
            score = 30  # No synergy

        return {
            "score": score,
            "distribution": region_counts,
            "dominant_region": max(region_counts, key=region_counts.get) if region_counts else None,
        }

    def _calculate_class_balance(self, heroes: list[dict]) -> dict:
        """Calculate class balance (Tenacity/Courage/Swiftness/Elemental/Shadow/Mystique)"""
        roles = [h.get("role", "Unknown") for h in heroes]
        role_counts = {}
        for role in roles:
            role_counts[role] = role_counts.get(role, 0) + 1

        # Ideal team composition check
        has_tank = role_counts.get("Tenacity", 0) >= 1
        has_dps = (role_counts.get("Courage", 0) + 
                   role_counts.get("Swiftness", 0) + 
                   role_counts.get("Elemental", 0) + 
                   role_counts.get("Shadow", 0)) >= 3
        has_support = role_counts.get("Mystique", 0) >= 1
        
        # Score based on composition
        score = 50  # Base score
        if has_tank:
            score += 15
        if has_dps:
            score += 20
        if has_support:
            score += 15
        
        # Variety bonus
        unique_roles = len(role_counts)
        if unique_roles >= 4:
            score = min(100, score + 10)

        return {"score": min(100, score), "distribution": role_counts, "variety": unique_roles}

    def _calculate_altar_hero_match(self, heroes: list[dict], altar_build: dict) -> dict:
        """Calculate how well altar build matches hero needs"""
        score = 60  # Base score
        
        # Count role types
        role_counts = {}
        for h in heroes:
            role = h.get("role", "Unknown")
            role_counts[role] = role_counts.get(role, 0) + 1

        # If Blood altar is high and we have tanks/DPS, good match
        blood_level = altar_build.get("blood", 0)
        if blood_level >= 10:
            if role_counts.get("Tenacity", 0) >= 2:
                score += 15

        # If Giant altar is high and we have Courage heroes, good match
        giant_level = altar_build.get("giant", 0)
        if giant_level >= 10:
            if role_counts.get("Courage", 0) >= 2:
                score += 15

        # If Mage altar is high and we have Elemental/Mystique, good match
        mage_level = altar_build.get("mage", 0)
        if mage_level >= 10:
            if (role_counts.get("Elemental", 0) + role_counts.get("Mystique", 0)) >= 2:
                score += 15

        # Hero altar helps everyone
        hero_level = altar_build.get("hero", 0)
        if hero_level >= 5:
            score += 5

        return {"score": min(100, score), "altar_build": altar_build}

    def _calculate_relic_synergy(self, relic_ids: list[int]) -> dict:
        """Calculate relic synergy"""
        if not relic_ids:
            return {"score": 0, "types": [], "loaded_count": 0, "note": "No relics provided"}
            
        relics = []
        for relic_id in relic_ids:
            relic = self.game_data.get_relic(relic_id)
            if relic:
                relics.append(relic)

        # Score based on how many relics loaded
        score = (len(relics) / max(len(relic_ids), 1)) * 80 + 20

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
            dominant = region_score.get('dominant_region', 'one')
            recommendations.append(
                f"Thêm hero từ vùng {dominant} để kích hoạt synergy (+altar level)"
            )

        # Class balance
        if class_score["score"] < 70:
            dist = class_score.get("distribution", {})
            if dist.get("Tenacity", 0) < 1:
                recommendations.append("Thêm tank (Tenacity) để đỡ damage")
            if dist.get("Mystique", 0) < 1:
                recommendations.append("Thêm support (Mystique) như Luniare, Asiaq để buff team")

        # Altar optimization
        blood_level = altar_build.get("blood", 0)
        mage_level = altar_build.get("mage", 0)
        
        if blood_level < 5 and mage_level < 5:
            recommendations.append("Tăng Blood hoặc Mage altar tùy team comp")

        if len(recommendations) == 0:
            recommendations.append("Team composition tốt! Hãy focus vào positioning trên board 7x4.")

        return recommendations
