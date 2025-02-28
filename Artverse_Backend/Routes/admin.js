// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const Admin = require('../Models/admin'); // Path to your Admin model
const bcrypt = require('bcryptjs');

// Add Admin Route
router.post('/addAdmin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Create new admin
    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding admin', error: error.message });
  }
});

// Admin Signin Route without JWT
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Signin successful
    res.status(200).json({ message: 'Signin successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
});


const User = require('../Models/user'); // Path to User model
const Artist = require('../Models/artist'); // Path to Artist model

// Route to show all artists with details
router.get('/artists', async (req, res) => {
  try {
    // Find users with role 'artist' and populate their artist details
    const artists = await User.find({ role: 'artist' })
      .populate('artistDetails') // Populate the artist details
      .exec();

    if (artists.length === 0) {
      return res.status(404).json({ message: 'No artists found' });
    }

    // Send the response with all artist details
    res.status(200).json(artists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching artists', error: error.message });
  }
});


// Admin API to verify a user by email
router.put('/verifyUser', async (req, res) => {
  try {
    const { email } = req.body; // Email passed in request body

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update isVerified field to true
    user.isVerified = true;
    await user.save(); // Save the updated user

    res.status(200).json({ message: 'User verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying user', error: error.message });
  }
});


// Admin API to block a user by email
router.put('/blockUser', async (req, res) => {
  try {
    const { email } = req.body; // Email passed in request body

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update isBlocked field to true
    user.isBlocked = true;
    await user.save(); // Save the updated user

    res.status(200).json({ message: 'User blocked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error blocking user', error: error.message });
  }
});


// Admin API to unblock a user by email
router.put('/unblockUser', async (req, res) => {
  try {
    const { email } = req.body; // Email passed in request body

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update isBlocked field to false
    user.isBlocked = false;
    await user.save(); // Save the updated user

    res.status(200).json({ message: 'User unblocked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error unblocking user', error: error.message });
  }
});


// Admin API to set isVerified to false for a user by email
router.put('/unverifyUser', async (req, res) => {
  try {
    const { email } = req.body; // Email passed in request body

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update isVerified field to false
    user.isVerified = false;
    await user.save(); // Save the updated user

    res.status(200).json({ message: 'User unverified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error unverifying user', error: error.message });
  }
});

module.exports = router;
