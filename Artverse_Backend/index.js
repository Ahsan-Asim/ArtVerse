const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const Artist = require("./Models/artist");
const Artwork = require("./Models/artwork"); // Import Artwork model
const { connectMongoDb } = require("./connection");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`Blocked request from unlisted origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routers
const userRouter = require("./Routes/user");
const artistRouter = require("./Routes/artist");
const artworkRouter = require("./Routes/artwork");
const adminRouter = require("./Routes/admin");
const cartRoutes = require("./Routes/cart");

// Connect MongoDB
connectMongoDb("mongodb://127.0.0.1:27017/fyp");

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Create downloads directory if not exists
const downloadsPath = path.join(__dirname, "downloads");
if (!fs.existsSync(downloadsPath)) {
  fs.mkdirSync(downloadsPath);
}

// Function to download images from URLs
const downloadImage = async (imageUrl, filename) => {
  try {
    const response = await axios({
      url: imageUrl,
      responseType: "stream",
    });

    const filePath = path.join(downloadsPath, filename);
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(`downloads/${filename}`));
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading image:", error);
    return "/downloads/placeholder.jpg"; // Default image if download fails
  }
};

// Route to fetch random or filtered artworks (Limited to 30)
app.get("/api/artworks/filtered", async (req, res) => {
  try {
    const { minPrice, maxPrice, medium, style, artist } = req.query;
    let filter = {};

    if (minPrice && maxPrice) filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    if (medium) filter.medium = medium;
    if (style) filter.style = style;
    if (artist) filter.artist = artist;

    console.log("MongoDB Query:", filter);

    const paintings = await Artwork.find(filter).limit(30);
    console.log("Fetched paintings:", paintings.length);

    res.json(Array.isArray(paintings) ? paintings : []);
  } catch (error) {
    console.error("Error fetching filtered paintings:", error);
    res.status(500).json([]); // Always return an array
  }
});

// Set up API routes
app.use("/api/users", userRouter);
app.use("/api/artists", artistRouter);
app.use("/api/artwork", artworkRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart", cartRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
