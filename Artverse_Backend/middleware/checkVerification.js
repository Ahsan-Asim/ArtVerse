const User = require('../Models/user');

const checkVerification = async (req, res, next) => {
  try {
    const email = req.user.email; // Assuming the email is set in `req.user` by the auth middleware
    const user = await User.findOne({ email });
    console.log(user.email);


    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    console.log(user.isVerified);

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Your account is under verification. You cannot upload artwork yet.' });
    }

    next(); // Proceed if verified
  } catch (error) {
    console.error('Error checking verification:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = checkVerification;
