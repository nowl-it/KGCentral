"""
Game Data Loader

Load and parse game data from docs/game-data/ folder
"""
import json
from pathlib import Path
from typing import Any


class GameDataLoader:
    """Load game data from JSON files"""

    def __init__(self, data_dir: str = "../../../docs/game-data"):
        self.data_dir = Path(__file__).parent.parent.parent.parent / "docs" / "game-data"
        self.heroes: dict[str, Any] = {}
        self.relics: dict[str, Any] = {}
        self.altars: dict[str, Any] = {}
        self.equipment: dict[str, Any] = {}

    def load_all(self) -> None:
        """Load all game data"""
        self.load_heroes()
        self.load_relics()
        # Altars and equipment are in README format for now
        print(f"✅ Loaded {len(self.heroes)} heroes, {len(self.relics)} relics")

    def load_heroes(self) -> None:
        """Load hero data from JSON files"""
        heroes_dir = self.data_dir / "heroes"
        if not heroes_dir.exists():
            print(f"⚠️  Heroes directory not found: {heroes_dir}")
            return

        # Load from all subdirectories (east, west, south, north, central)
        for region_dir in heroes_dir.iterdir():
            if region_dir.is_dir():
                for hero_file in region_dir.glob("*.json"):
                    try:
                        with open(hero_file, "r", encoding="utf-8") as f:
                            hero_data = json.load(f)
                            hero_id = hero_data.get("id")
                            if hero_id:
                                self.heroes[hero_id] = hero_data
                    except Exception as e:
                        print(f"⚠️  Error loading {hero_file}: {e}")

        # Also check root heroes folder for example files
        for hero_file in heroes_dir.glob("*.json"):
            try:
                with open(hero_file, "r", encoding="utf-8") as f:
                    hero_data = json.load(f)
                    hero_id = hero_data.get("id")
                    if hero_id:
                        self.heroes[hero_id] = hero_data
            except Exception as e:
                print(f"⚠️  Error loading {hero_file}: {e}")

    def load_relics(self) -> None:
        """Load relic data from JSON files"""
        relics_dir = self.data_dir / "relics"
        if not relics_dir.exists():
            print(f"⚠️  Relics directory not found: {relics_dir}")
            return

        # Load from all subdirectories (summon, corruption, arena, special)
        for type_dir in relics_dir.iterdir():
            if type_dir.is_dir():
                for relic_file in type_dir.glob("*.json"):
                    try:
                        with open(relic_file, "r", encoding="utf-8") as f:
                            relic_data = json.load(f)
                            relic_id = relic_data.get("id")
                            if relic_id:
                                self.relics[relic_id] = relic_data
                    except Exception as e:
                        print(f"⚠️  Error loading {relic_file}: {e}")

        # Also check root relics folder for example files
        for relic_file in relics_dir.glob("*.json"):
            try:
                with open(relic_file, "r", encoding="utf-8") as f:
                    relic_data = json.load(f)
                    relic_id = relic_data.get("id")
                    if relic_id:
                        self.relics[relic_id] = relic_data
            except Exception as e:
                print(f"⚠️  Error loading {relic_file}: {e}")

    def get_hero(self, hero_id: str) -> dict[str, Any] | None:
        """Get hero by ID"""
        return self.heroes.get(hero_id)

    def get_heroes_by_region(self, region: str) -> list[dict[str, Any]]:
        """Get all heroes from a specific region"""
        return [h for h in self.heroes.values() if h.get("region", "").lower() == region.lower()]

    def get_relic(self, relic_id: str) -> dict[str, Any] | None:
        """Get relic by ID"""
        return self.relics.get(relic_id)

    def get_relics_by_type(self, relic_type: str) -> list[dict[str, Any]]:
        """Get all relics of a specific type"""
        return [r for r in self.relics.values() if r.get("type", "").lower() == relic_type.lower()]

    def get_all_heroes(self) -> dict[str, Any]:
        """Get all heroes"""
        return self.heroes

    def get_all_relics(self) -> dict[str, Any]:
        """Get all relics"""
        return self.relics


# Global instance
game_data = GameDataLoader()
