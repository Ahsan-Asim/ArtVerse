const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using a secret key from an environment variable (or use a secure key)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '1234'); // Secure key
    req.user = decoded; // AttachQ the user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;