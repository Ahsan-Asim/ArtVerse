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







module.exports = router;
