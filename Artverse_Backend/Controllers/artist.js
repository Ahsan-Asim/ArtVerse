// controllers/userController.js

const Artist = require('../Models/artist'); // Import the Artist model
const User = require('../Models/user'); // Import the Artist model


// Function to handle artist registration
exports.registerArtist = async (req, res) => {
  try {
    const { name, email, country, state, city, address, education, about } = req.body;

    // Check if the artist email already exists
    const existingArtist = await Artist.findOne({ email });
    if (existingArtist) {
      return res.status(400).json({ message: 'Artist with this email already exists.' });
    }

    // Create a new artist
    const artist = new Artist({
      name,
      email,
      country,
      state,
      city,
      address,
      education,
      about,
    });

    await artist.save();
    res.status(201).json({ message: 'Artist registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// Get artist profile by email
exports.getArtistByEmail = async (req, res) => {
  const { artistEmail } = req.params;

  try {
    const artist = await Artist.findOne({ email: artistEmail });
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found.' });
    }
    res.status(200).json(artist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// controllers/artistController.js

exports.updateArtist = async (req, res) => {
  const { email } = req.params;
  const { name, country, state, city, address, education, about } = req.body;

  try {
    const artist = await Artist.findOneAndUpdate(
      { email },
      { name, country, state, city, address, education, about },
      { new: true } // Return the updated document
    );

    if (!artist) {
      return res.status(404).json({ message: 'Artist not found.' });
    }

    res.status(200).json(artist); // Return the updated artist data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};


exports.followArtist = async (req, res) => {
  try {
    const {  artistName,email } = req.body;

    // Find the user by their name (or use another identifier like email if needed)
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Find the artist by their name
    const artist = await Artist.findOne({ name: artistName });
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    // Check if the user is already following the artist
    if (!user.follows.includes(artist._id)) {
      user.follows.push(artist._id); // Add artist to user's follows
      await user.save();
      return res.status(200).json({ message: 'Artist followed successfully' });
    }

    res.status(400).json({ message: 'Artist already followed' });
  } catch (error) {
    console.error('Error following artist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getFollowedArtists = async (req, res) => {
  try {
    const { email } = req.params; // User's email from request params

    // Find user by email and populate the 'follows' field with the artist details
    const user = await User.findOne({ email }).populate('follows'); // Populating 'follows' array with artist details
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the populated followed artists (includes name, image, etc.)
    res.status(200).json(user.follows);
  } catch (error) {
    console.error('Error fetching followed artists:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Unfollow artist route
exports.unfollowArtist = async (req, res) => {
  const { userEmail, artistId } = req.body;
  console.log("artist id is:", artistId);

  if (!userEmail || !artistId) {
    return res.status(400).json({ error: 'User email and artist ID are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if artistId exists in the follows array
    const artistIndex = user.follows.indexOf(artistId);

    if (artistIndex === -1) {
      return res.status(400).json({ error: 'Artist not followed' });
    }

    // Remove the artistId from the follows array
    user.follows.splice(artistIndex, 1);

    // Save the updated user document
    const updatedUser = await user.save();

    res.json({ message: 'Unfollowed successfully', updatedUser });
  } catch (error) {
    console.error('Error unfollowing artist:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
