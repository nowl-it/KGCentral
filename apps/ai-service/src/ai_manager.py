"""
AI Model Manager

Handles loading, saving, and inference with PyTorch models
"""
import torch
from pathlib import Path
from typing import Optional

from src.models import TeamRecommender


class ModelManager:
    """Manage AI models for team recommendation"""
    
    def __init__(self, model_dir: str = "models"):
        self.model_dir = Path(__file__).parent.parent.parent / model_dir
        self.model_dir.mkdir(exist_ok=True)
        
        self.recommender: Optional[TeamRecommender] = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        print(f"🤖 AI Device: {self.device}")
        
    def initialize_model(
        self,
        num_heroes: int = 70,
        num_regions: int = 5,
        num_classes: int = 10,
        num_relics: int = 49,
        num_relic_types: int = 4,
    ):
        """Initialize a new model"""
        self.recommender = TeamRecommender(
            num_heroes=num_heroes,
            num_regions=num_regions,
            num_classes=num_classes,
            num_relics=num_relics,
            num_relic_types=num_relic_types,
        ).to(self.device)
        
        print(f"✅ Model initialized with {num_heroes} heroes, {num_relics} relics")
        
    def load_model(self, model_name: str = "team_recommender.pt"):
        """Load a trained model from disk"""
        model_path = self.model_dir / model_name
        
        if not model_path.exists():
            print(f"⚠️  Model not found: {model_path}")
            print(f"   Initializing new model instead...")
            self.initialize_model()
            return False
            
        try:
            checkpoint = torch.load(model_path, map_location=self.device)
            
            # Initialize model with saved config
            config = checkpoint.get("config", {})
            self.initialize_model(**config)
            
            # Load weights
            self.recommender.load_state_dict(checkpoint["model_state_dict"])
            self.recommender.eval()
            
            print(f"✅ Model loaded from {model_path}")
            return True
            
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            self.initialize_model()
            return False
            
    def save_model(
        self,
        model_name: str = "team_recommender.pt",
        config: Optional[dict] = None,
    ):
        """Save model to disk"""
        model_path = self.model_dir / model_name
        
        if self.recommender is None:
            print("❌ No model to save")
            return
            
        checkpoint = {
            "model_state_dict": self.recommender.state_dict(),
            "config": config or {
                "num_heroes": 70,
                "num_regions": 5,
                "num_classes": 10,
                "num_relics": 49,
                "num_relic_types": 4,
            },
        }
        
        torch.save(checkpoint, model_path)
        print(f"✅ Model saved to {model_path}")
        
    def predict_synergy(
        self,
        hero_ids: list[int],
        region_ids: list[int],
        class_ids: list[int],
        altar_levels: list[int],
        relic_ids: list[int],
        relic_type_ids: list[int],
    ) -> float:
        """
        Predict team synergy using neural network
        
        Returns:
            synergy_score: 0-100
        """
        if self.recommender is None:
            raise RuntimeError("Model not initialized. Call initialize_model() or load_model()")
            
        self.recommender.eval()
        
        with torch.no_grad():
            score = self.recommender.predict_synergy(
                hero_ids=hero_ids,
                region_ids=region_ids,
                class_ids=class_ids,
                altar_levels=altar_levels,
                relic_ids=relic_ids,
                relic_type_ids=relic_type_ids,
            )
            
        return score
    
    def get_hero_embedding(self, hero_id: int, region_id: int, class_id: int):
        """Get embedding vector for a hero"""
        if self.recommender is None:
            raise RuntimeError("Model not initialized")
            
        self.recommender.eval()
        
        with torch.no_grad():
            embedding = self.recommender.get_hero_embedding(hero_id, region_id, class_id)
            
        return embedding.cpu().numpy()


# Global model manager instance
model_manager = ModelManager()
