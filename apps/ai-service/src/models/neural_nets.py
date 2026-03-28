"""
AI Models for Team Recommendation

PyTorch-based neural networks for:
1. Hero embeddings
2. Team synergy prediction
3. Recommendation system
"""
import torch
import torch.nn as nn
import torch.nn.functional as F
from typing import Optional


class HeroEmbedding(nn.Module):
    """
    Embedding layer for heroes
    
    Converts hero features into dense vector representation
    """
    
    def __init__(
        self,
        num_heroes: int = 70,
        num_regions: int = 5,
        num_classes: int = 10,
        embedding_dim: int = 64,
    ):
        super().__init__()
        
        self.hero_embedding = nn.Embedding(num_heroes, embedding_dim)
        self.region_embedding = nn.Embedding(num_regions, 16)
        self.class_embedding = nn.Embedding(num_classes, 16)
        
        # Combine all embeddings
        self.combine = nn.Linear(embedding_dim + 16 + 16, embedding_dim)
        
    def forward(self, hero_ids, region_ids, class_ids):
        """
        Args:
            hero_ids: [batch_size] - Hero IDs
            region_ids: [batch_size] - Region IDs (0-4)
            class_ids: [batch_size] - Class IDs
            
        Returns:
            embeddings: [batch_size, embedding_dim]
        """
        hero_emb = self.hero_embedding(hero_ids)
        region_emb = self.region_embedding(region_ids)
        class_emb = self.class_embedding(class_ids)
        
        # Concatenate
        combined = torch.cat([hero_emb, region_emb, class_emb], dim=1)
        
        # Mix and return
        return F.relu(self.combine(combined))


class TeamSynergyNet(nn.Module):
    """
    Neural network for predicting team synergy score
    
    Input: 6 hero embeddings + altar build + 3 relic embeddings
    Output: Synergy score (0-100)
    """
    
    def __init__(
        self,
        hero_embedding_dim: int = 64,
        relic_embedding_dim: int = 32,
        hidden_dim: int = 128,
    ):
        super().__init__()
        
        # Team composition encoder
        self.team_encoder = nn.Sequential(
            nn.Linear(6 * hero_embedding_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
        )
        
        # Altar encoder (6 altar types, each 0-15 level)
        self.altar_encoder = nn.Sequential(
            nn.Linear(6, 32),
            nn.ReLU(),
            nn.Linear(32, 32),
            nn.ReLU(),
        )
        
        # Relic encoder
        self.relic_encoder = nn.Sequential(
            nn.Linear(3 * relic_embedding_dim, 64),
            nn.ReLU(),
            nn.Linear(64, 64),
            nn.ReLU(),
        )
        
        # Final synergy predictor
        self.synergy_head = nn.Sequential(
            nn.Linear(hidden_dim + 32 + 64, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim, 64),
            nn.ReLU(),
            nn.Linear(64, 1),
            nn.Sigmoid(),  # Output 0-1, scale to 0-100
        )
        
    def forward(
        self,
        hero_embeddings,  # [batch_size, 6, embedding_dim]
        altar_levels,     # [batch_size, 6]
        relic_embeddings, # [batch_size, 3, relic_embedding_dim]
    ):
        """
        Predict team synergy score
        
        Returns:
            scores: [batch_size] - Synergy scores (0-100)
        """
        batch_size = hero_embeddings.size(0)
        
        # Flatten hero embeddings
        team_vec = hero_embeddings.view(batch_size, -1)
        team_encoded = self.team_encoder(team_vec)
        
        # Encode altars
        altar_encoded = self.altar_encoder(altar_levels.float())
        
        # Flatten and encode relics
        relic_vec = relic_embeddings.view(batch_size, -1)
        relic_encoded = self.relic_encoder(relic_vec)
        
        # Combine all features
        combined = torch.cat([team_encoded, altar_encoded, relic_encoded], dim=1)
        
        # Predict synergy (0-1)
        synergy_01 = self.synergy_head(combined).squeeze(-1)
        
        # Scale to 0-100
        return synergy_01 * 100


class RelicEmbedding(nn.Module):
    """Embedding layer for relics"""
    
    def __init__(
        self,
        num_relics: int = 49,
        num_types: int = 4,
        embedding_dim: int = 32,
    ):
        super().__init__()
        
        self.relic_embedding = nn.Embedding(num_relics, embedding_dim)
        self.type_embedding = nn.Embedding(num_types, 8)
        
        self.combine = nn.Linear(embedding_dim + 8, embedding_dim)
        
    def forward(self, relic_ids, type_ids):
        """
        Args:
            relic_ids: [batch_size] - Relic IDs
            type_ids: [batch_size] - Type IDs (0-3)
            
        Returns:
            embeddings: [batch_size, embedding_dim]
        """
        relic_emb = self.relic_embedding(relic_ids)
        type_emb = self.type_embedding(type_ids)
        
        combined = torch.cat([relic_emb, type_emb], dim=1)
        
        return F.relu(self.combine(combined))


class TeamRecommender(nn.Module):
    """
    Complete team recommendation system
    
    Combines embeddings and synergy prediction
    """
    
    def __init__(
        self,
        num_heroes: int = 70,
        num_regions: int = 5,
        num_classes: int = 10,
        num_relics: int = 49,
        num_relic_types: int = 4,
        hero_embedding_dim: int = 64,
        relic_embedding_dim: int = 32,
    ):
        super().__init__()
        
        self.hero_embedder = HeroEmbedding(
            num_heroes=num_heroes,
            num_regions=num_regions,
            num_classes=num_classes,
            embedding_dim=hero_embedding_dim,
        )
        
        self.relic_embedder = RelicEmbedding(
            num_relics=num_relics,
            num_types=num_relic_types,
            embedding_dim=relic_embedding_dim,
        )
        
        self.synergy_net = TeamSynergyNet(
            hero_embedding_dim=hero_embedding_dim,
            relic_embedding_dim=relic_embedding_dim,
        )
        
    def forward(
        self,
        hero_ids,      # [batch_size, 6]
        region_ids,    # [batch_size, 6]
        class_ids,     # [batch_size, 6]
        altar_levels,  # [batch_size, 6]
        relic_ids,     # [batch_size, 3]
        relic_type_ids,# [batch_size, 3]
    ):
        """
        Full forward pass
        
        Returns:
            synergy_scores: [batch_size]
        """
        batch_size = hero_ids.size(0)
        
        # Get hero embeddings
        hero_embs = []
        for i in range(6):
            emb = self.hero_embedder(
                hero_ids[:, i],
                region_ids[:, i],
                class_ids[:, i],
            )
            hero_embs.append(emb.unsqueeze(1))
        hero_embeddings = torch.cat(hero_embs, dim=1)  # [batch, 6, emb_dim]
        
        # Get relic embeddings
        relic_embs = []
        for i in range(3):
            emb = self.relic_embedder(
                relic_ids[:, i],
                relic_type_ids[:, i],
            )
            relic_embs.append(emb.unsqueeze(1))
        relic_embeddings = torch.cat(relic_embs, dim=1)  # [batch, 3, relic_dim]
        
        # Predict synergy
        scores = self.synergy_net(hero_embeddings, altar_levels, relic_embeddings)
        
        return scores
    
    def get_hero_embedding(self, hero_id, region_id, class_id):
        """Get embedding for a single hero"""
        hero_id = torch.tensor([hero_id])
        region_id = torch.tensor([region_id])
        class_id = torch.tensor([class_id])
        
        with torch.no_grad():
            return self.hero_embedder(hero_id, region_id, class_id)
    
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
        Predict synergy for a single team
        
        Args:
            hero_ids: List of 6 hero IDs
            region_ids: List of 6 region IDs (0-4)
            class_ids: List of 6 class IDs
            altar_levels: List of 6 altar levels
            relic_ids: List of 3 relic IDs
            relic_type_ids: List of 3 relic type IDs (0-3)
            
        Returns:
            synergy_score: Float (0-100)
        """
        # Convert to tensors
        hero_ids_t = torch.tensor([hero_ids])
        region_ids_t = torch.tensor([region_ids])
        class_ids_t = torch.tensor([class_ids])
        altar_levels_t = torch.tensor([altar_levels])
        relic_ids_t = torch.tensor([relic_ids])
        relic_type_ids_t = torch.tensor([relic_type_ids])
        
        with torch.no_grad():
            score = self.forward(
                hero_ids_t,
                region_ids_t,
                class_ids_t,
                altar_levels_t,
                relic_ids_t,
                relic_type_ids_t,
            )
            
        return score.item()
