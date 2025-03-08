const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require("http");
const Artist = require("./Models/artist");
const socket = require("./socket");
const { connectMongoDb } = require("./connection");

const app = express();
const server = http.createServer(app); // Create an HTTP server with Express

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize WebSockets
const io = socket.init(server);

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);
});

// Import routers
const userRouter = require("./Routes/user");
const artistRouter = require("./Routes/artist");
const artworkRouter = require("./Routes/artwork");
const adminRouter = require("./Routes/admin");
const requestRouter = require("./Routes/request");
const notificationRouter = require("./Routes/Notification");


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
    console.error("Error fetching artist data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Connect MongoDB and set up routes
connectMongoDb("mongodb://127.0.0.1:27017/fyp");

app.use("/api/users", userRouter);
app.use("/api/artists", artistRouter);
app.use("/api/artwork", artworkRouter);
app.use("/api/admin", adminRouter);
app.use("/api/requests", requestRouter);

app.use("/api/notifications", notificationRouter);


const cartRoutes = require("./Routes/cart");
app.use("/api/cart", cartRoutes);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
