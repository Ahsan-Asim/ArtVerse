const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const artworkController = require("../Controllers/artwork");
const authMiddleware = require("../middleware/authMiddleware");
const checkVerification = require("../middleware/checkVerification");
const User = require("../Models/user");
const Artwork = require("../Models/artwork");

// 📂 Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/artworks"); // Store images in "uploads/artworks"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// 🎨 Route to upload artwork
router.post("/upload", authMiddleware, checkVerification, upload.single("image"), artworkController.uploadArtwork);

// 🎨 Route to get artwork by user email
router.get("/getArtwork/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const artworks = await Artwork.find({ _id: { $in: user.artworks } });
    res.status(200).json(artworks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// 🔍 Artwork search route
router.get("/search", async (req, res) => {
  try {
    const { title } = req.query;
    const artworks = await Artwork.find({ title: new RegExp(title, "i") });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Route to delete artwork
router.delete("/delete", async (req, res) => {
  const { email, title } = req.body;

  if (!email || !title) return res.status(400).json({ error: "Email and title are required." });

  try {
    const user = await User.findOne({ email }).populate("artworks");
    if (!user) return res.status(404).json({ error: "User not found." });

    const artworkToDelete = user.artworks.find((artwork) => artwork.title === title);
    if (!artworkToDelete) return res.status(404).json({ error: "Artwork not found." });

    user.artworks = user.artworks.filter((artwork) => artwork._id.toString() !== artworkToDelete._id.toString());
    await user.save();

    await Artwork.findByIdAndDelete(artworkToDelete._id);
    res.status(200).json({ message: "Artwork deleted successfully." });
  } catch (error) {
    console.error("Error deleting artwork:", error);
    res.status(500).json({ error: "An error occurred while deleting the artwork." });
  }
});

// ✏️ Route to update artwork details
router.put("/update", async (req, res) => {
  const { email, title, updatedFields } = req.body;

  if (!email || !title) return res.status(400).json({ error: "Email and title are required." });

  try {
    const user = await User.findOne({ email }).populate("artworks");
    if (!user) return res.status(404).json({ error: "User not found." });

    const artworkId = user.artworks.find((artwork) => artwork.title === title);
    if (!artworkId) return res.status(404).json({ error: "Artwork not found." });

    const updatedArtwork = await Artwork.findByIdAndUpdate(artworkId, { $set: updatedFields }, { new: true });
    res.status(200).json({ message: "Artwork updated successfully.", updatedArtwork });
  } catch (error) {
    console.error("Error editing artwork:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

/* ----------------------------------------------
✅ New Routes: Filters & Filtered Artwork
---------------------------------------------- */

// 🎨 Fetch unique mediums, types, and price range for filters
router.get("/filters", async (req, res) => {
  try {
    const mediums = await Artwork.distinct("medium");
    const types = await Artwork.distinct("type");

    const minPrice = await Artwork.find().sort({ Price: 1 }).limit(1);
    const maxPrice = await Artwork.find().sort({ Price: -1 }).limit(1);

    res.json({
      mediums,
      types,
      priceRange: {
        min: minPrice.length ? minPrice[0].Price : 0,
        max: maxPrice.length ? maxPrice[0].Price : 100000,
      }
    });
  } catch (error) {
    console.error("Error fetching filters:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/filtered", async (req, res) => {
  try {
    const { minPrice, maxPrice, medium, artist, style } = req.query;
    let matchStage = {}; // Filtering criteria

    if (minPrice && maxPrice) {
      matchStage.Price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }
    if (medium) {
      matchStage.medium = medium;
    }
    if (artist) {
      matchStage.artist = { $regex: new RegExp(artist, "i") };
    }
    if (style) {
      matchStage.style = { $regex: new RegExp(style, "i") };
    }

    const randomPaintings = await Artwork.aggregate([
      { $match: matchStage }, // Apply filters
      { $sample: { size: 30 } }, // Pick 30 random documents
      { $limit: 30 } // Ensure limit
    ]);

    console.log("Fetched Random Paintings:", randomPaintings.length); // Log count
    res.json(randomPaintings);
  } catch (error) {
    console.error("Error fetching random paintings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;