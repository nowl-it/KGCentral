"""
Training script for team recommendation model

Usage:
    python train.py --epochs 100 --batch-size 64 --lr 0.001
"""
import argparse
import torch

from src.models import TeamRecommender
from src.training import TeamDataset, train_model, evaluate_model
from src.ai_manager import model_manager


def main():
    parser = argparse.ArgumentParser(description="Train team recommendation model")
    parser.add_argument("--epochs", type=int, default=50, help="Number of epochs")
    parser.add_argument("--batch-size", type=int, default=32, help="Batch size")
    parser.add_argument("--lr", type=float, default=0.001, help="Learning rate")
    parser.add_argument("--train-samples", type=int, default=5000, help="Training samples")
    parser.add_argument("--val-samples", type=int, default=1000, help="Validation samples")
    parser.add_argument("--test-samples", type=int, default=500, help="Test samples")
    parser.add_argument("--save-path", type=str, default="team_recommender.pt", help="Model save path")
    
    args = parser.parse_args()
    
    # Device
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"🖥️  Using device: {device}")
    
    # Create datasets
    print("\n📊 Generating synthetic data...")
    train_dataset = TeamDataset(num_samples=args.train_samples)
    val_dataset = TeamDataset(num_samples=args.val_samples)
    test_dataset = TeamDataset(num_samples=args.test_samples)
    
    print(f"   Train: {len(train_dataset)} samples")
    print(f"   Val: {len(val_dataset)} samples")
    print(f"   Test: {len(test_dataset)} samples")
    
    # Initialize model
    print("\n🤖 Initializing model...")
    model_manager.initialize_model()
    model = model_manager.recommender
    
    # Train
    print("\n🏋️  Training...")
    train_model(
        model=model,
        train_dataset=train_dataset,
        val_dataset=val_dataset,
        num_epochs=args.epochs,
        batch_size=args.batch_size,
        learning_rate=args.lr,
        device=str(device),
    )
    
    # Evaluate
    print("\n📈 Evaluating...")
    evaluate_model(model, test_dataset, device=str(device))
    
    # Save
    print(f"\n💾 Saving model to {args.save_path}...")
    model_manager.save_model(model_name=args.save_path)
    
    print("\n✅ Training complete!")


if __name__ == "__main__":
    main()
