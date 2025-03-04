const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  _key: { type: Number, required: true }, // Unique key field
  image: { type: String, required: true }, // URL of the artwork image
  artwork: { type: String, required: true }, // Artwork title (e.g., Narmer Palette)
  style: { type: String }, // Style of the artwork (e.g., Early-Dynastic)
  artist: { type: String, required: true }, // Artist or civilization (e.g., Ancient Egypt)
  date: { type: String }, // Year or period of creation (e.g., 3050 BC)
  type: { type: String }, // Type of artwork (e.g., Sculpture)
  medium: { type: String }, // Medium used (e.g., Bronze)
  description: { type: String }, // Description of the artwork
  width: { type: Number }, // Width in pixels or relevant units
  height: { type: Number }, // Height in pixels or relevant units
  price: { type: Number }, // Price of the artwork
  createdAt: { type: Date, default: Date.now } // Timestamp of record creation
});

module.exports = mongoose.model('Artwork', artworkSchema);
