require("dotenv").config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const Artist = require("./Models/artist");

const app = express();

// CORS Configuration
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"];
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded images

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fyp";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Import Routes
const userRouter = require("./Routes/user");
const artistRouter = require("./Routes/artist");
const artworkRouter = require("./Routes/artwork");
const adminRouter = require("./Routes/admin");
const cartRouter = require("./Routes/cart");
const requestRouter = require("./Routes/request"); // ✅ Added request routes

// Register Routes
app.use("/api/users", userRouter);
app.use("/api/artists", artistRouter);
app.use("/api/artwork", artworkRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart", cartRouter);
app.use("/api/requests", requestRouter); // ✅ Handle customization requests

// Route to Get Artist Details by Email
app.get("/api/artist/image", async (req, res) => {
  const artistEmail = req.query.email;
  try {
    const artist = await Artist.findOne({ email: artistEmail });
    if (artist) {
      res.json({
        name: artist.name,
        email: artist.email,
        profileImage: artist.image,
      });
    } else {
      res.status(404).json({ message: "Artist not found" });
    }
  } catch (err) {
    console.error("❌ Error fetching artist data:", err);
    res.status(500).json({ message: "Server error" });
  }
});
app.get('/api/artist/notifications', async (req, res) => {
  try {
    const artists = await Artist.find(); // Fetch all artists

    if (!artists || artists.length === 0) {
      return res.status(404).json({ message: 'No artists found' });
    }

    // Send notifications to all artists
    const notifications = artists.map(artist => ({
      name: artist.name,
      email: artist.email,
      profileImage: artist.image, // Profile image path
      notification: "🎨 New artwork customization request is available!", // Example notification
    }));

    res.json({ success: true, notifications });
  } catch (err) {
    console.error('Error fetching artist notifications:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
