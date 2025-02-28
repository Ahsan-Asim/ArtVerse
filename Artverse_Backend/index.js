const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors package
const path = require("path");
const Artist = require('./Models/artist'); // Import the Artist model

const { connectMongoDb } = require('./connection');

const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001','http://localhost:3002'];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import user and artist routers
const userRouter = require("./Routes/user");
const artistRouter = require("./Routes/artist");
const artworkRouter = require("./Routes/artwork");
const adminRouter = require("./Routes/admin");



// Serve static files from the 'uploads' folder
// app.use('/uploads', express.static('uploads'));
// Serve static files (images) from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to get artist details by email
app.get('/api/artist/image', async (req, res) => {
  const artistEmail = req.query.email;  // Fetch email from query string

  try {
    const artist = await Artist.findOne({ email: artistEmail }); // Find artist by email
    if (artist) {
      res.json({
        name: artist.name,
        email: artist.email,
        profileImage: artist.image, // Send the profile image path
      });
    } else {
      res.status(404).json({ message: 'Artist not found' });
    }
  } catch (err) {
    console.error('Error fetching artist data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Connect MongoDB and set up routes
connectMongoDb('mongodb://127.0.0.1:27017/fyp');
app.use('/api/users', userRouter);
app.use('/api/artists', artistRouter); // Add the artist route
app.use('/api/artwork', artworkRouter); // Add the artist route
app.use('/api/admin', adminRouter); // Add the artist route
const cartRoutes = require('./Routes/cart');
app.use('/api/cart', cartRoutes);


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
