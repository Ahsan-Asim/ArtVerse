// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user');
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware
const User = require('../Models/user');



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


module.exports=router