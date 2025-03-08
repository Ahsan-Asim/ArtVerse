// // const express = require("express");
// // const Notification = require("../Models/Notification");
// // const Artist = require("../Models/artist");

// // const router = express.Router();

// // // Fetch notifications for the logged-in artist using email (stored in sessionStorage)
// // router.get("/:email", async (req, res) => {
// //   try {
// //     const { email } = req.params;
    
// //     // Find the artist based on the email
// //     const artist = await Artist.findOne({ email });
// //     if (!artist) {
// //       return res.json({ success: false, message: "Artist not found" });
// //     }

// //     // Fetch notifications for the artist
// //     const notifications = await Notification.find({ artistId: artist._id });

// //     res.json({ success: true, notifications });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: "Error fetching notifications", error });
// //   }
// // });

// // module.exports = router;

// const express = require("express");
// const Notification = require("../Models/Notification");

// const router = express.Router();

// // Fetch all notifications (for all artists)
// router.get("/", async (req, res) => {
//   try {
//     // Fetch all notifications from the database
//     const notifications = await Notification.find();

//     res.json({ success: true, notifications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching notifications", error });
//   }
// });

// module.exports = router;


const express = require("express");
const Notification = require("../Models/Notification");
const Artist = require("../Models/artist");
const authMiddleware = require("../middleware/authMiddleware"); // Import JWT middleware
const User = require("../Models/user");
const Request = require("../Models/request");

const router = express.Router();

// ✅ Fetch logged-in artist's details using JWT (GET /api/notifications/auth/me)
// router.get("/auth/me", authMiddleware, async (req, res) => {
//   try {
//     // Extract user ID from JWT token
//     const artistId = req.user.id;

//     // Find artist by ID
//     const artist = await Artist.findById(artistId).select("-password"); // Exclude password
//     if (!artist) {
//       return res.status(404).json({ success: false, message: "Artist not found" });
//     }

//     res.json({ success: true, artist });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching artist details", error });
//   }
// });

// ✅ Fetch notifications for the logged-in artist (GET /api/notifications)
router.get("/artist-not", authMiddleware, async (req, res) => {
  try {
    const artistId = req.user.id; // Get artist ID from JWT token

    // Fetch notifications where artistId matches
    const notifications = await Notification.find({ artistId });

    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching notifications", error });
  }
});
router.get("/user-not",authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from JWT token
    console.log("user iddd",userId);

    // Fetch requests where the logged-in user is the owner and at least one artist is interested
    const requests = await Request.find({ userId, interested_people: { $ne: [] } })
      .populate("interested_people", "name profileImage") // Populate artist details
      .sort({ createdAt: -1 });

    // Format notifications from interested artists
    const notifications = requests.map((request) => ({
      requestId: request._id,
      message: `Your request has new interested artists!`,
      interestedArtists: request.interested_people,
      timestamp: request.updatedAt,
    }));

    res.json({ success: true, notifications });
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    res.status(500).json({ success: false, message: "Error fetching notifications" });
  }
});
// router.get("/user-not", authMiddleware, async (req, res) => {
//   try {
//     const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, notifications });
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });


// ✅ Fetch notifications for an artist using email (Deprecated if JWT is used)
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find the artist by email
    const artist = await Artist.findOne({ email });
    if (!artist) {
      return res.json({ success: false, message: "Artist not found" });
    }

    // Fetch notifications for the artist
    const notifications = await Notification.find({ artistId: artist._id });

    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching notifications", error });
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)
      .populate("userId", "name email role isVerified isBlocked")
      .populate("requestId");

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.json({ 
      success: true, 
      notification: {
        _id: notification._id,
        user: notification.userId, 
        request: notification.requestId
      } 
    });

  } catch (error) {
    console.error("Error fetching notification:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



module.exports = router;


