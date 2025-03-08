// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user');
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware
const User = require('../Models/user');
const Request = require('../Models/request');




// Route for user signup
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/google-signup', userController.googleSignup);
router.post('/google-signin', userController.googleSignin);

router.post('/become-artist', userController.becomeArtist);
router.get('/getUserByEmail/:email', userController.getUserByEmail);
router.get('/getUserStatus/:email', userController.getUserStatus);


router.put('/updateArtistByEmail/:email', userController.updateArtist); // Add a new PUT route for updating artist profile

router.put('/updateData/:email', userController.updateData); // Add a new PUT route for updating artist profile
router.get('/getUserByEmail1/:email', userController.getUserByEmail1);
router.get('/me',authMiddleware, userController.getme);







// Protected route for user profile

router.get('/home', authMiddleware, async (req, res) => {
  try {
    // Access the user data from the decoded token
    const user = await User.findOne({ email: req.user.email }); // Use findOne instead of findById
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/commission-requests", async (req, res) => {
  try {
    const userEmail = req.query.email; // Get email from query params
    console.log("received email",userEmail)
    
    if (!userEmail) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    
    const user = await User.findOne({ email: userEmail });
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    const requests = await Request.find({ userId: user._id })
      .populate("interested_people", "name email country")
      .lean();

    res.status(200).json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching commission requests:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});






module.exports=router;