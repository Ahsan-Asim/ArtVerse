from flask import Flask, request, jsonify
from flask_cors import CORS
import faiss
import json
import numpy as np
import requests
from PIL import Image
from io import BytesIO
import os
import torch
from transformers import CLIPProcessor, CLIPModel

# Flask App Setup
app = Flask(__name__)

# Allow frontend at localhost:3000 to access backend at localhost:5000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Define Image Directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGE_DIR = os.path.join(BASE_DIR, "static", "images")
os.makedirs(IMAGE_DIR, exist_ok=True)

# Detect Device
device = "cuda" if torch.cuda.is_available() else "cpu"

# Load FAISS Index & Metadata
INDEX_PATH = os.path.join(BASE_DIR, "vector.index")
METADATA_PATH = os.path.join(BASE_DIR, "vector.index_metadata.json")

if not os.path.exists(INDEX_PATH):
    raise FileNotFoundError(f"❌ FAISS index file '{INDEX_PATH}' not found!")
index = faiss.read_index(INDEX_PATH)

if not os.path.exists(METADATA_PATH):
    raise FileNotFoundError(f"❌ Metadata file '{METADATA_PATH}' not found!")
with open(METADATA_PATH, "r") as f:
    metadata_dict = json.load(f)

# Load CLIP Model
model_name = "openai/clip-vit-base-patch32"
model = CLIPModel.from_pretrained(model_name).to(device)
processor = CLIPProcessor.from_pretrained(model_name)

# Function to Generate Image Embeddings
def get_embedding(image):
    inputs = processor(images=image, return_tensors="pt").to(device)
    features = model.get_image_features(**inputs)
    return features.detach().cpu().numpy().astype(np.float32)

# Function to Download Image
def download_image(image_url):
    try:
        response = requests.get(image_url, timeout=10)
        response.raise_for_status()
        image_name = os.path.basename(image_url).split("?")[0]
        image_path = os.path.join(IMAGE_DIR, image_name)

        if not os.path.exists(image_path):
            with open(image_path, "wb") as f:
                f.write(response.content)
            print(f"✅ Image downloaded: {image_path}")

        return f"/static/images/{image_name}"
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to download image: {image_url}, Error: {e}")
        return None

# Flask Route to Handle Image Search
@app.route('/search', methods=['POST'])
def retrieve_similar_images():
    image = None
    if 'image' in request.files:
        file = request.files['image']
        image = Image.open(file.stream).convert("RGB")
    elif 'url' in request.form:
        response = requests.get(request.form['url'], timeout=10)
        image = Image.open(BytesIO(response.content)).convert("RGB")

    if image is None:
        return jsonify({"error": "No valid image file or URL provided"}), 400

    # Generate Embedding & Retrieve Similar Images
    query_features = get_embedding(image).reshape(1, -1)
    distances, indices = index.search(query_features, 5)
    results = []

    for idx in indices[0]:
        metadata = metadata_dict.get(str(int(idx)), {})
        image_url = metadata.get("image", "")
        local_path = download_image(image_url) if image_url else None
        metadata["local_image_path"] = local_path
        results.append(metadata)

    return jsonify({"results": results})

# Run Flask App on Port 5000
if __name__ == '__main__':
    app.run(debug=True, port=5000)
