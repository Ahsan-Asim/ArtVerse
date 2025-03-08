const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require("http");
const fs = require("fs");
const axios = require("axios");
const { connectMongoDb } = require("./connection");

// Import models
const Artist = require("./Models/artist");
const Artwork = require("./Models/artwork");

const app = express();
const server = http.createServer(app); // Create an HTTP server with Express

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

// Initialize WebSockets
const socket = require("./socket");
const io = socket.init(server);
io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);
});

// Connect MongoDB
connectMongoDb("mongodb://127.0.0.1:27017/fyp");

// Import routers
const userRouter = require("./Routes/user");
const artistRouter = require("./Routes/artist");
const artworkRouter = require("./Routes/artwork");
const adminRouter = require("./Routes/admin");
const requestRouter = require("./Routes/request");
const notificationRouter = require("./Routes/Notification");
const cartRoutes = require("./Routes/cart");

// Set up API routes
app.use("/api/users", userRouter);
app.use("/api/artists", artistRouter);
app.use("/api/artwork", artworkRouter);
app.use("/api/admin", adminRouter);
app.use("/api/requests", requestRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/cart", cartRoutes);

// Serve static files
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

// Fetch artist image API
app.get("/api/artist/image", async (req, res) => {
  try {
    const artistEmail = req.query.email;
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
    console.error("Error fetching artist data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
