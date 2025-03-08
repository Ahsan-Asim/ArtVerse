// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const artistController = require('../Controllers/artist');

const User = require('../Models/user');
const Artist = require('../Models/artist');




// New route for artist registration
router.post('/register-artist', artistController.registerArtist);

// Route to get artist profile by ID
router.get('/:artistEmail', artistController.getArtistByEmail);
router.put('/:email', artistController.updateArtist); // Add a new PUT route for updating artist profile

router.post('/follow', artistController.followArtist); // Route for following an artist
router.get('/followed-artists/:email', artistController.getFollowedArtists);
router.put('/unfollow_artist', artistController.unfollowArtist);

router.get("/me", async (req, res) => {
  try {
    const artist = await Artist.findById(req.user.id).select("-password");
    if (!artist) {
      return res.status(404).json({ success: false, message: "Artist not found" });
    }
    res.json({ success: true, profileImage: artist.profileImage, artist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});






module.exports = router;
