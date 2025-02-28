const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  image: { type: String, required: true }, // Path to the uploaded image
  title: { type: String, required: true },
  category: { type: String },
  subject: { type: String },
  yearProduced: { type: Number },
  medium: { type: String },
  material: { type: String },
  style: { type: String },
  price: { type: Number, required: true },
  height: { type: Number },
  width: { type: Number },
  depth: { type: Number },
  description: { type: String },
  artist: { type: String, required: true }, // Reference to the artist's email
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Artwork', artworkSchema);
