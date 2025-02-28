const express = require('express');
const router = express.Router();
const multer = require('multer');
const artworkController = require('../Controllers/artwork');
const authMiddleware = require('../middleware/authMiddleware');
const checkVerification = require('../middleware/checkVerification');
const User = require('../Models/user'); // Import the User model
const Artwork = require('../Models/artwork');



const path = require('path'); // Add this line to require the 'path' module


// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/artworks'); // Define where to store the images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set file name to current timestamp
  }
});

const upload = multer({ storage });

// Route to upload artwork
router.post('/upload', authMiddleware, checkVerification, upload.single('image'), artworkController.uploadArtwork);

router.get('/getArtwork/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const artworks = await Artwork.find({ _id: { $in: user.artworks } });
    res.status(200).json(artworks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Your artwork search route
router.get('/search', (req, res) => {
  const { title } = req.query;
  // Your logic to fetch artworks by title
  Artwork.find({ title: new RegExp(title, 'i') })
    .then(artworks => res.json(artworks))
    .catch(err => res.status(500).json({ error: err.message }));
});



router.delete("/delete", async (req, res) => {
  const { email, title } = req.body; // Extract email and title from request body

  if (!email || !title) {
    return res.status(400).json({ error: "Email and title are required." });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email }).populate("artworks");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Find the artwork in the user's list by title
    const artworkToDelete = user.artworks.find((artwork) => artwork.title === title);

    if (!artworkToDelete) {
      return res.status(404).json({ error: "Artwork not found in user's list." });
    }

    // Remove the artwork reference from the user's artworks array
    user.artworks = user.artworks.filter((artwork) => artwork._id.toString() !== artworkToDelete._id.toString());
    await user.save();

    // Delete the artwork from the Artwork collection
    await Artwork.findByIdAndDelete(artworkToDelete._id);

    return res.status(200).json({ message: "Artwork deleted successfully." });
  } catch (error) {
    console.error("Error deleting artwork:", error);
    return res.status(500).json({ error: "An error occurred while deleting the artwork." });
  }
});



router.put("/update", async (req, res) => {
  const { email, title, updatedFields } = req.body;

  if (!email || !title) {
    return res.status(400).json({ error: "Email and title are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email }).populate('artworks');
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Find the artwork to be edited
    const artworkId = user.artworks.find((artwork) => artwork.title === title);
    if (!artworkId) {
      return res.status(404).json({ error: "Artwork not found." });
    }

    // Update the artwork
    const updatedArtwork = await Artwork.findByIdAndUpdate(
      artworkId,
      { $set: updatedFields },
      { new: true }
    );

    return res.status(200).json({ message: "Artwork updated successfully.", updatedArtwork });
  } catch (error) {
    console.error("Error editing artwork:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;