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
        self.heroes: dict[int, Any] = {}
        self.relics: dict[int, Any] = {}
        self.altars: dict[int, Any] = {}
        self.equipment: dict[int, Any] = {}
        self.synergies: dict[int, Any] = {}
        self._raw_data: dict[str, Any] = {}

    def load_all(self) -> None:
        """Load all game data"""
        self.load_heroes()
        self.load_relics()
        self.load_altars()
        self.load_equipment()
        self.load_synergies()
        print(f"✅ Loaded: {len(self.heroes)} heroes, {len(self.relics)} artifacts, "
              f"{len(self.altars)} altars, {len(self.equipment)} equipment, "
              f"{len(self.synergies)} synergies")

    def load_heroes(self) -> None:
        """Load hero data from all-heroes.json"""
        heroes_file = self.data_dir / "heroes" / "all-heroes.json"
        if not heroes_file.exists():
            print(f"⚠️  Heroes file not found: {heroes_file}")
            return
        
        try:
            with open(heroes_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                self._raw_data["heroes"] = data
                for hero in data.get("heroes", []):
                    hero_id = hero.get("id")
                    if hero_id:
                        self.heroes[hero_id] = hero
        except Exception as e:
            print(f"⚠️  Error loading heroes: {e}")

    def load_relics(self) -> None:
        """Load relic/artifact data from all-relics.json"""
        relics_file = self.data_dir / "relics" / "all-relics.json"
        if not relics_file.exists():
            print(f"⚠️  Relics file not found: {relics_file}")
            return
        
        try:
            with open(relics_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                self._raw_data["relics"] = data
                for relic in data.get("artifacts", []):
                    relic_id = relic.get("id")
                    if relic_id:
                        self.relics[relic_id] = relic
        except Exception as e:
            print(f"⚠️  Error loading relics: {e}")

    def load_altars(self) -> None:
        """Load altar/building data from all-altars.json"""
        altars_file = self.data_dir / "altars" / "all-altars.json"
        if not altars_file.exists():
            print(f"⚠️  Altars file not found: {altars_file}")
            return
        
        try:
            with open(altars_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                self._raw_data["altars"] = data
                for altar in data.get("buildings", []):
                    altar_id = altar.get("id")
                    if altar_id is not None:
                        self.altars[altar_id] = altar
        except Exception as e:
            print(f"⚠️  Error loading altars: {e}")

    def load_equipment(self) -> None:
        """Load equipment data from all-equipment.json"""
        equip_file = self.data_dir / "equipment" / "all-equipment.json"
        if not equip_file.exists():
            print(f"⚠️  Equipment file not found: {equip_file}")
            return
        
        try:
            with open(equip_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                self._raw_data["equipment"] = data
                for item in data.get("equipment", []):
                    item_id = item.get("id")
                    if item_id:
                        self.equipment[item_id] = item
        except Exception as e:
            print(f"⚠️  Error loading equipment: {e}")

    def load_synergies(self) -> None:
        """Load synergy data from all-synergies.json"""
        synergies_file = self.data_dir / "synergies" / "all-synergies.json"
        if not synergies_file.exists():
            print(f"⚠️  Synergies file not found: {synergies_file}")
            return
        
        try:
            with open(synergies_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                self._raw_data["synergies"] = data
                for synergy in data.get("synergies", []):
                    synergy_id = synergy.get("id")
                    if synergy_id:
                        self.synergies[synergy_id] = synergy
        except Exception as e:
            print(f"⚠️  Error loading synergies: {e}")

    def get_hero(self, hero_id: int) -> dict[str, Any] | None:
        """Get hero by ID"""
        return self.heroes.get(hero_id)

    def get_hero_by_name(self, name: str, lang: str | None = None) -> dict[str, Any] | None:
        """Get hero by name (searches all languages)"""
        name_lower = name.lower()
        for hero in self.heroes.values():
            # Search in new format with 'names' dict
            names = hero.get("names", {})
            for lang_code, localized_name in names.items():
                if localized_name and localized_name.lower() == name_lower:
                    return hero
            # Fallback to old format
            if (hero.get("nameEn", "").lower() == name_lower or 
                hero.get("nameVi", "").lower() == name_lower):
                return hero
        return None

    def get_hero_name(self, hero: dict[str, Any], lang: str = "en") -> str:
        """Get hero name in specified language"""
        names = hero.get("names", {})
        return names.get(lang) or names.get("en") or hero.get("nameKr", "")

    def get_heroes_by_region(self, region: str) -> list[dict[str, Any]]:
        """Get all heroes from a specific region"""
        return [h for h in self.heroes.values() if h.get("region", "").lower() == region.lower()]

    def get_heroes_by_role(self, role: str) -> list[dict[str, Any]]:
        """Get all heroes with a specific role/class"""
        role_lower = role.lower()
        return [h for h in self.heroes.values() 
                if h.get("role", "").lower() == role_lower or 
                   h.get("roleRaw", "").lower() == role_lower]

    def get_relic(self, relic_id: int) -> dict[str, Any] | None:
        """Get relic by ID"""
        return self.relics.get(relic_id)

    def get_relics_by_type(self, relic_type: str) -> list[dict[str, Any]]:
        """Get all relics of a specific type"""
        return [r for r in self.relics.values() if r.get("type", "").lower() == relic_type.lower()]

    def get_altar(self, altar_id: int) -> dict[str, Any] | None:
        """Get altar by ID"""
        return self.altars.get(altar_id)

    def get_equipment_by_type(self, equip_type: str) -> list[dict[str, Any]]:
        """Get all equipment of a specific type"""
        return [e for e in self.equipment.values() if e.get("equipType", "").lower() == equip_type.lower()]

    def get_all_heroes(self) -> list[dict[str, Any]]:
        """Get all heroes as a list"""
        return list(self.heroes.values())

    def get_all_relics(self) -> list[dict[str, Any]]:
        """Get all relics as a list"""
        return list(self.relics.values())

    def get_all_altars(self) -> list[dict[str, Any]]:
        """Get all altars as a list"""
        return list(self.altars.values())

    def get_all_equipment(self) -> list[dict[str, Any]]:
        """Get all equipment as a list"""
        return list(self.equipment.values())

    def get_all_synergies(self) -> list[dict[str, Any]]:
        """Get all synergies as a list"""
        return list(self.synergies.values())

    def get_stats_summary(self) -> dict[str, Any]:
        """Get summary statistics about loaded data"""
        heroes_by_region = {}
        heroes_by_role = {}
        for h in self.heroes.values():
            region = h.get("region", "Unknown")
            role = h.get("role", "Unknown")
            heroes_by_region[region] = heroes_by_region.get(region, 0) + 1
            heroes_by_role[role] = heroes_by_role.get(role, 0) + 1
        
        return {
            "heroes": {
                "total": len(self.heroes),
                "byRegion": heroes_by_region,
                "byRole": heroes_by_role
            },
            "relics": len(self.relics),
            "altars": len(self.altars),
            "equipment": len(self.equipment),
            "synergies": len(self.synergies),
            "version": self._raw_data.get("heroes", {}).get("version", "unknown")
        }


# Global instance
game_data = GameDataLoader()
