const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");


/////////////////////////////////
const Request = require("../Models/request");
const Artist = require("../Models/artist");

// Add artist to interested_people in a request
exports.showInterest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const artistId = req.user._id; // Assuming artist is authenticated

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    // Save notification for the user
    const notification = new Notification({
      userId: request.userId,
      requestId: requestId,
      message: `An artist has shown interest in your request!`,
      isRead: false,
    });

    await notification.save();

    // Send real-time notification to the request's user
    const userSocketId = onlineUsers[request.userId.toString()];
    if (userSocketId) {
      io.to(userSocketId).emit("artist-interest", {
        message: `An artist has shown interest in your request!`,
        request: {
          _id: request._id,
          budget: request.budget,
          time: request.time,
        },
      });
    }

    res.json({ success: true, message: "Interest recorded and user notified!" });
  } catch (error) {
    console.error("Error showing interest:", error);
    res.status(500).json({ success: false, message: "Error showing interest", error });
  }
};



//////////////////////////////

const requestController = require('../Controllers/requestController');

// router.post('/submit', requestController.submitRequest);
router.post("/submit", upload.single("image"), requestController.submitRequest);

router.get('/all', requestController.getRequests);
router.post('/update/:id', requestController.updateRequestStatus);

router.post("/:requestId/interested", async (req, res) => {
  try {
    const { email } = req.body; // Get artist email from frontend

    // Find the artist by email
    const artist = await Artist.findOne({ email });
    if (!artist) {
      return res.status(404).json({ success: false, message: "Artist not found" });
    }

    // Find the request and update the interested_people field
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.requestId,
      { $addToSet: { interested_people: artist._id } }, // Add artist ID if not already present
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.json({ success: true, message: "Marked as interested!", request: updatedRequest });
  } catch (error) {
    console.error("Error updating interest:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

