const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  _key: { type: Number, unique: true }, // Ensure it's unique
  image: { type: String, required: true },
  title: { type: String, required: true },
  category: String,
  subject: String,
  yearProduced: String,
  medium: String,
  material: String,
  style: String,
  price: Number,
  height: Number,
  width: Number,
  depth: Number,
  description: String,
  artist: { type: String, required: true },
});

// Create the model
const Artwork = mongoose.model('Artwork', artworkSchema);

// Function to add a new artwork with an auto-incremented `_key`
const addArtwork = async (artworkData) => {
  try {
    // Find the last artwork's `_key`
    const lastArtwork = await Artwork.findOne().sort({ _key: -1 });

    // Determine the next `_key`
    const nextKey = lastArtwork ? lastArtwork._key + 1 : 10005;

    // Create the new artwork document
    const newArtwork = new Artwork({
      _key: nextKey,
      ...artworkData
    });

    // Save to the database
    await newArtwork.save();
    console.log("Artwork added successfully with _key:", nextKey);
  } catch (error) {
    console.error("Error adding artwork:", error);
  }
};

module.exports = { Artwork, addArtwork };
module.exports = mongoose.model('Artwork', artworkSchema);
