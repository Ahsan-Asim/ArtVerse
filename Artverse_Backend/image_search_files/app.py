from flask import Flask, request, jsonify
import faiss
import json
import numpy as np
import requests
from PIL import Image
from io import BytesIO
from transformers import CLIPProcessor, CLIPModel
from flask_cors import CORS
import os
import torch

# Initialize Flask
app = Flask(__name__)
CORS(app, resources={r"/search": {"origins": "*"}})  # Allow frontend requests

# Detect device
device = "cuda" if torch.cuda.is_available() else "cpu"

# Load FAISS index and metadata
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INDEX_PATH = os.path.join(BASE_DIR, "vector.index")
METADATA_PATH = os.path.join(BASE_DIR, "vector.index_metadata.json")

if not os.path.exists(INDEX_PATH):
    raise FileNotFoundError(f"❌ FAISS index file '{INDEX_PATH}' not found!")

index = faiss.read_index(INDEX_PATH)

if not os.path.exists(METADATA_PATH):
    raise FileNotFoundError(f"❌ Metadata file '{METADATA_PATH}' not found!")

with open(METADATA_PATH, "r") as f:
    metadata_dict = json.load(f)

print("✅ FAISS index and metadata loaded successfully!")

# Load CLIP model
model_name = "openai/clip-vit-base-patch32"
try:
    model = CLIPModel.from_pretrained(model_name).to(device)
    processor = CLIPProcessor.from_pretrained(model_name)
    print("✅ CLIP model loaded successfully!")
except Exception as e:
    raise RuntimeError(f"❌ Failed to load CLIP model: {e}")

def get_embedding(image):
    """Generate CLIP embedding for an image."""
    inputs = processor(images=image, return_tensors="pt").to(device)
    features = model.get_image_features(**inputs)
    return features.detach().cpu().numpy().astype(np.float32)

@app.route('/search', methods=['POST'])
def retrieve_similar_images():
    """API endpoint to retrieve similar images."""
    image = None  

    if 'image' in request.files:
        file = request.files['image']
        try:
            image = Image.open(file.stream).convert("RGB")
        except Exception as e:
            return jsonify({"error": f"Invalid image file: {e}"}), 400

    elif 'url' in request.form:
        url = request.form['url']
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            image = Image.open(BytesIO(response.content)).convert("RGB")
        except requests.exceptions.RequestException as e:
            return jsonify({"error": f"Failed to fetch image from URL: {e}"}), 400
        except Exception as e:
            return jsonify({"error": f"Invalid image from URL: {e}"}), 400

    if image is None:
        return jsonify({"error": "No valid image file or URL provided"}), 400

    query_features = get_embedding(image).reshape(1, -1)

    top_k = 5
    distances, indices = index.search(query_features, top_k)

    results = [metadata_dict.get(str(int(idx)), {}) for idx in indices[0]]

    return jsonify({"results": results})

if __name__ == '__main__':
    app.run(debug=True)
