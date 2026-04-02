#!/bin/bash
# AI Service Quick Start Script

cd "$(dirname "$0")"

echo "🎮 Starting KGCentral AI Service..."
echo ""

# Activate virtual environment
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found!"
    echo "   Please run: python -m venv venv && source venv/bin/activate && pip install -e ."
    exit 1
fi

source venv/bin/activate

# Check if dependencies are installed
if ! python -c "import uvicorn" 2>/dev/null; then
    echo "📦 Installing dependencies..."
    pip install -e . --quiet
fi

echo "🔍 Killing existing uvicorn processes..."
killall uvicorn 2>/dev/null || true

echo "✅ Dependencies ready"
echo "🚀 Starting server on http://localhost:5000"
echo ""
echo "📚 Swagger UI: http://localhost:5000/docs"
echo ""
echo "Press CTRL+C to stop the server"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Start server with reload
python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 5000
