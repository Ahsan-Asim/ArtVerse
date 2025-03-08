// controllers/userController.js

const User = require('../Models/user');
const Artist = require('../Models/artist'); // Import the Artist model


// controllers/userController.js

// const { OAuth2Client } = require('google-auth-library');

// // Initialize Google OAuth Client with your client ID
// const client = new OAuth2Client('868206158931-8u3ftrs4ekvg4jitiu02bab01n5hj7q9.apps.googleusercontent.com');

// exports.googleSignup = async (req, res) => {
//   const { token } = req.body;
  
//   try {
//     // Verify the Google token
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: '868206158931-8u3ftrs4ekvg4jitiu02bab01n5hj7q9.apps.googleusercontent.com', // Your Google OAuth 2.0 Client ID
//     });

//     const payload = ticket.getPayload();
//     const { email} = payload;

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(200).json({ message: 'User already exists!' });
//     }

//     // Create new user with the Google data
//     const user = new User({
//       email
//     });

//     console.log(user.email);
//     console.log(user.name);

//     await user.save();

//     res.status(201).json({ message: 'User registered successfully via Google!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Google authentication failed', error });
//   }
// };


const { OAuth2Client } = require('google-auth-library');

// Initialize Google OAuth Client with your client ID
const client = new OAuth2Client('868206158931-8u3ftrs4ekvg4jitiu02bab01n5hj7q9.apps.googleusercontent.com');

exports.googleSignup = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '868206158931-8u3ftrs4ekvg4jitiu02bab01n5hj7q9.apps.googleusercontent.com', // Replace with your Google OAuth 2.0 Client ID
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload; // `sub` is the Google ID

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ message: 'User already exists!', user });
    }

    // Create a new user with the Google data
    user = new User({
      email,
      name,
      googleId, // Store the unique Google ID
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully via Google!', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Google authentication failed', error });
  }
};

exports.googleSignin = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '868206158931-8u3ftrs4ekvg4jitiu02bab01n5hj7q9.apps.googleusercontent.com', // Replace with your Google OAuth 2.0 Client ID
    });
    const { email, name } = ticket.getPayload();

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      // Create a new user if not exists
      user = new User({ email, name, googleId: token });
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      { expiresIn: '1h' }
    );

    // Send the token and role
    res.status(200).json({ token: jwtToken, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Google Sign-In failed', error });
  }
};




////////////////////////////////////////////////
// Controller to handle user 
exports.signup = async (req, res) => {
  try {
    const { firstName,lastName, email, phone,age,gender, password,role } = req.body;

    // Check if the email or phone already exists in the database
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or phone already in use.' });
    }

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      age,
      gender,
      password,
      role, // Ideally, hash the password before saving
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



exports.getUserStatus = async (req, res) => {
  const { email } = req.params; // Get the email from the URL parameter

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });

    if (!user) {
      // If no user is found, send a 404 error
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's verification and block status
    return res.status(200).json({
      isVerified: user.isVerified,  // Assuming you have isVerified field in your User model
      isBlocked: user.isBlocked     // Assuming you have isBlocked field in your User model
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const User = require('../Models/user');

// Sign-in (login) functionality
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    // const user = await User.findOne({ email,password });
    const user = await User.findOne({ email });


    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      '1234', // Use a strong secret key
      { expiresIn: '1hr' } // Token expiration (20 seconds)
    );
    

    // Send the token in response
    res.status(200).json({
      message: 'Login successful',
      token, // Send the token to the client
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role, // Include role if applicable
      },    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
////////////////////
// Update user to become an artist
// exports.becomeArtist = async (req, res) => {
//   const { name, email, country, state, city, address, education, about } = req.body;

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Check if the user is already an artist
//     if (user.role === 'artist') {
//       return res.status(400).json({ message: 'User is already an artist.' });
//     }

//    // Create a new artist
//    const artist = new Artist({
//     name,
//     email,
//     country,
//     state,
//     city,
//     address,
//     education,
//     about,
//   });
//     const savedArtist = await artist.save();

//     // Update user role and reference to artistDetails
//     user.role = 'artist';
//     user.artistDetails = savedArtist._id;

//     await user.save();

//     res.status(200).json({ message: 'User is now an artist!', user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage (Local file storage)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/artist_images'; // Directory to save images
        // Ensure the directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Get file extension
        cb(null, Date.now() + ext); // Save the file with a timestamp name
    },
});

const upload = multer({ storage }).single('image'); // Single file upload

exports.becomeArtist = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Image upload failed', error: err });
        }

        const { name, email, country, state, city, address, education, about, awards, certificates } = req.body;
        const imagePath = req.file ? req.file.path : null; // Get the uploaded image path

        try {
            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            // Check if the user is already an artist
            if (user.role === 'artist') {
                return res.status(400).json({ message: 'User is already an artist.' });
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
                awards,
                certificates,
                image: imagePath, // Save the image path
            });
            const savedArtist = await artist.save();

            // Update user role and reference to artistDetails
            user.role = 'artist';
            user.artistDetails = savedArtist._id;

            await user.save();

            res.status(200).json({ message: 'User is now an artist!', user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        }
    });
};



// // Get artist profile by email
// exports.getUserByEmail = async (req, res) => {
//   const { email } = req.params;

//   try {
//     const artist = await User.findOne({ email: email });
//     if (!artist) {
//       return res.status(404).json({ message: 'User not found.' });
//     }
//     res.status(200).json(artist);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

// Example: Backend route to fetch user details
// exports.getUserByEmail = async (req, res) => {
//   const { email } = req.params;

//   try {
//     const user = await User.findOne({ email }).populate('artistDetails');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email })
      .populate('artistDetails') // Populate artist details if needed
      .populate('artworks'); // Populate artworks

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user); // Now the user object will contain artworks
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



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


exports.updateData = async (req, res) => {
  const { email } = req.params;
  const { name, country, state, city, address, education, about, phone,awards,certificates } = req.body;

  try {
    // Fetch user from User model using the provided email
    const user = await User.findOne({ email });

    // If no user is found, return an error message
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Determine the role from the User model
    const role = user.role; // Assuming `role` is a field in the User model

    if (role === 'user') {
      // Handle update for User model
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { name, phone }, // Update only name and phone for User
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found for update.' });
      }

      return res.status(200).json(updatedUser); // Return the updated user data
    }

    if (role === 'artist') {
      // Handle update for Artist model
      const artist = await Artist.findOneAndUpdate(
        { email },
        { name, country, state, city, address, education, about,awards,certificates },
        { new: true }
      );

      if (!artist) {
        return res.status(404).json({ message: 'Artist not found for update.' });
      }

      return res.status(200).json(artist); // Return the updated artist data
    }

    // If role doesn't match any expected role
    return res.status(403).json({ message: 'Unauthorized role.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};



//the below give user detail without populating its artist detail:
// Get artist profile by email
exports.getUserByEmail1 = async (req, res) => {
  // const { userEmail } = req.params;
  const userEmail = req.params.email || req.params.userEmail; // Check both possible names


  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.getme = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    console.log("user idddddddd is",user);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
