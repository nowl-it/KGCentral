#!/bin/bash
# Setup KGCentral custom Ollama model
# Run this after installing Ollama

set -e

echo "🏰 Setting up KGCentral Royal Guard AI..."

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama not found. Install with:"
    echo "   curl -fsSL https://ollama.com/install.sh | sh"
    exit 1
fi

# Check if Ollama is running
if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo "⚠️  Ollama not running. Starting..."
    ollama serve &
    sleep 3
fi

# Pull base model if not exists
echo "📦 Checking base model qwen2.5:3b..."
if ! ollama list | grep -q "qwen2.5:3b"; then
    echo "📥 Pulling qwen2.5:3b (this may take a while)..."
    ollama pull qwen2.5:3b
fi

# Create custom model
echo "🔨 Creating kgcentral-guard model..."
cd "$(dirname "$0")"
ollama create kgcentral-guard -f Modelfile

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 To use the custom model:"
echo "   1. Update MODEL_NAME in src/routes/chat.py to 'kgcentral-guard'"
echo "   2. Or test directly: ollama run kgcentral-guard"
echo ""
echo "🎮 The Royal Guard is ready to serve, Your Majesty!"
