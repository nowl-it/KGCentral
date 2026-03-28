"""
Training utilities for team recommendation models

This module provides tools for:
1. Generating synthetic training data
2. Training the neural network
3. Evaluating model performance
"""
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import random
from typing import List, Tuple, Optional

from src.models import TeamRecommender


class TeamDataset(Dataset):
    """
    Dataset for team compositions
    
    Each sample is a team with:
    - 6 heroes (IDs, regions, classes)
    - 6 altar levels
    - 3 relics (IDs, types)
    - Synergy score (label)
    """
    
    def __init__(
        self,
        num_samples: int = 1000,
        num_heroes: int = 70,
        num_regions: int = 5,
        num_classes: int = 10,
        num_relics: int = 49,
        num_relic_types: int = 4,
    ):
        self.num_samples = num_samples
        self.num_heroes = num_heroes
        self.num_regions = num_regions
        self.num_classes = num_classes
        self.num_relics = num_relics
        self.num_relic_types = num_relic_types
        
        # Generate synthetic data
        self.data = self._generate_synthetic_data()
        
    def _generate_synthetic_data(self) -> List[Tuple]:
        """Generate synthetic training data"""
        data = []
        
        for _ in range(self.num_samples):
            # Random team composition
            hero_ids = random.sample(range(self.num_heroes), 6)
            region_ids = [random.randint(0, self.num_regions - 1) for _ in range(6)]
            class_ids = [random.randint(0, self.num_classes - 1) for _ in range(6)]
            
            # Random altar build (must sum to 25)
            altar_levels = self._random_altar_build()
            
            # Random relics
            relic_ids = random.sample(range(self.num_relics), 3)
            relic_type_ids = [random.randint(0, self.num_relic_types - 1) for _ in range(3)]
            
            # Calculate synthetic label (ground truth synergy)
            label = self._calculate_synthetic_label(
                region_ids, class_ids, altar_levels
            )
            
            data.append((
                hero_ids,
                region_ids,
                class_ids,
                altar_levels,
                relic_ids,
                relic_type_ids,
                label,
            ))
            
        return data
    
    def _random_altar_build(self) -> List[int]:
        """Generate random altar build that sums to 25"""
        # Start with 25 points
        remaining = 25
        altars = [0] * 6
        
        for i in range(6):
            if i == 5:
                # Last altar gets remaining points
                altars[i] = min(remaining, 15)
            else:
                # Random allocation (0-15, but leave some for others)
                max_alloc = min(15, remaining - (5 - i))
                altars[i] = random.randint(0, max_alloc)
                remaining -= altars[i]
                
        return altars
    
    def _calculate_synthetic_label(
        self,
        region_ids: List[int],
        class_ids: List[int],
        altar_levels: List[int],
    ) -> float:
        """
        Calculate synthetic synergy score (0-100)
        
        This is a simple heuristic for training data generation.
        Real labels would come from expert ratings or gameplay data.
        """
        score = 50.0  # Base score
        
        # Region synergy (same region = bonus)
        region_counts = {}
        for r in region_ids:
            region_counts[r] = region_counts.get(r, 0) + 1
        max_same_region = max(region_counts.values())
        score += min(20, max_same_region * 5)
        
        # Class diversity
        unique_classes = len(set(class_ids))
        score += min(15, unique_classes * 3)
        
        # Altar balance
        altar_variance = sum((x - 4.17) ** 2 for x in altar_levels) / 6
        if altar_variance < 10:
            score += 15  # Reward balanced builds
        
        # Add some noise
        score += random.uniform(-10, 10)
        
        return max(0, min(100, score))
    
    def __len__(self):
        return len(self.data)
    
    def __getitem__(self, idx):
        (
            hero_ids,
            region_ids,
            class_ids,
            altar_levels,
            relic_ids,
            relic_type_ids,
            label,
        ) = self.data[idx]
        
        return {
            "hero_ids": torch.tensor(hero_ids, dtype=torch.long),
            "region_ids": torch.tensor(region_ids, dtype=torch.long),
            "class_ids": torch.tensor(class_ids, dtype=torch.long),
            "altar_levels": torch.tensor(altar_levels, dtype=torch.long),
            "relic_ids": torch.tensor(relic_ids, dtype=torch.long),
            "relic_type_ids": torch.tensor(relic_type_ids, dtype=torch.long),
            "label": torch.tensor(label, dtype=torch.float),
        }


def train_model(
    model: TeamRecommender,
    train_dataset: TeamDataset,
    val_dataset: Optional[TeamDataset] = None,
    num_epochs: int = 50,
    batch_size: int = 32,
    learning_rate: float = 0.001,
    device: str = "cpu",
):
    """
    Train the team recommender model
    
    Args:
        model: TeamRecommender model
        train_dataset: Training dataset
        val_dataset: Optional validation dataset
        num_epochs: Number of training epochs
        batch_size: Batch size
        learning_rate: Learning rate
        device: Device to train on (cpu/cuda)
    """
    model = model.to(device)
    model.train()
    
    # Data loaders
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size) if val_dataset else None
    
    # Loss and optimizer
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)
    
    print(f"🏋️  Training on {len(train_dataset)} samples...")
    print(f"   Device: {device}")
    print(f"   Epochs: {num_epochs}")
    print(f"   Batch size: {batch_size}")
    print(f"   Learning rate: {learning_rate}")
    print("")
    
    for epoch in range(num_epochs):
        # Training
        model.train()
        train_loss = 0.0
        
        for batch in train_loader:
            # Move to device
            hero_ids = batch["hero_ids"].to(device)
            region_ids = batch["region_ids"].to(device)
            class_ids = batch["class_ids"].to(device)
            altar_levels = batch["altar_levels"].to(device)
            relic_ids = batch["relic_ids"].to(device)
            relic_type_ids = batch["relic_type_ids"].to(device)
            labels = batch["label"].to(device)
            
            # Forward pass
            predictions = model(
                hero_ids,
                region_ids,
                class_ids,
                altar_levels,
                relic_ids,
                relic_type_ids,
            )
            
            loss = criterion(predictions, labels)
            
            # Backward pass
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
            
        avg_train_loss = train_loss / len(train_loader)
        
        # Validation
        if val_loader:
            model.eval()
            val_loss = 0.0
            
            with torch.no_grad():
                for batch in val_loader:
                    hero_ids = batch["hero_ids"].to(device)
                    region_ids = batch["region_ids"].to(device)
                    class_ids = batch["class_ids"].to(device)
                    altar_levels = batch["altar_levels"].to(device)
                    relic_ids = batch["relic_ids"].to(device)
                    relic_type_ids = batch["relic_type_ids"].to(device)
                    labels = batch["label"].to(device)
                    
                    predictions = model(
                        hero_ids,
                        region_ids,
                        class_ids,
                        altar_levels,
                        relic_ids,
                        relic_type_ids,
                    )
                    
                    loss = criterion(predictions, labels)
                    val_loss += loss.item()
                    
            avg_val_loss = val_loss / len(val_loader)
            
            print(f"Epoch {epoch + 1}/{num_epochs} - "
                  f"Train Loss: {avg_train_loss:.4f}, "
                  f"Val Loss: {avg_val_loss:.4f}")
        else:
            print(f"Epoch {epoch + 1}/{num_epochs} - Train Loss: {avg_train_loss:.4f}")
            
    print("\n✅ Training complete!")


def evaluate_model(
    model: TeamRecommender,
    test_dataset: TeamDataset,
    device: str = "cpu",
):
    """Evaluate model performance"""
    model = model.to(device)
    model.eval()
    
    test_loader = DataLoader(test_dataset, batch_size=32)
    
    criterion = nn.MSELoss()
    total_loss = 0.0
    predictions_list = []
    labels_list = []
    
    with torch.no_grad():
        for batch in test_loader:
            hero_ids = batch["hero_ids"].to(device)
            region_ids = batch["region_ids"].to(device)
            class_ids = batch["class_ids"].to(device)
            altar_levels = batch["altar_levels"].to(device)
            relic_ids = batch["relic_ids"].to(device)
            relic_type_ids = batch["relic_type_ids"].to(device)
            labels = batch["label"].to(device)
            
            predictions = model(
                hero_ids,
                region_ids,
                class_ids,
                altar_levels,
                relic_ids,
                relic_type_ids,
            )
            
            loss = criterion(predictions, labels)
            total_loss += loss.item()
            
            predictions_list.extend(predictions.cpu().numpy())
            labels_list.extend(labels.cpu().numpy())
            
    avg_loss = total_loss / len(test_loader)
    
    print(f"\n📊 Evaluation Results:")
    print(f"   Test Loss (MSE): {avg_loss:.4f}")
    print(f"   Test RMSE: {avg_loss ** 0.5:.4f}")
    
    return {
        "mse": avg_loss,
        "rmse": avg_loss ** 0.5,
        "predictions": predictions_list,
        "labels": labels_list,
    }
