const User = require('../Models/user');
const Artist = require('../Models/artist'); // Import the Artist model

const Request = require('../Models/request'); // Import the Artist model
const Notification = require('../Models/Notification'); // Import the Artist model
const onlineArtists = {}; // Store online artists' socket IDs




exports.submitRequest = async (req, res) => {
  try {
    // Extract user email from headers
    const userEmail = req.headers["user-email"];
    if (!userEmail) {
      return res.status(400).json({ success: false, message: "User email is required" });
    }

    // Find user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Extract request data
    const { budget, time, description } = req.body;
    if (!budget || !time || !description) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Handle Image Upload
    let image = null;
    if (req.file) {
      image = req.file.buffer.toString("base64"); // Convert to base64 string
    }

    // Save request in the database
    const request = new Request({
      userId: user._id, // Associate request with the user
      budget,
      time,
      description,
      image, // Store image as base64
      status: "Pending"
    });

    await request.save();

    // Save a notification for this request
    const notification = new Notification({
      userId: user._id, 
      requestId: request._id, 
      message: `New customization request received! Budget: ${request.budget}, Time: ${request.time}`,
      isRead: false
    });

    await notification.save();

    // Find all online artists
    const artists = await User.find({ role: "artist" });

    // Send real-time notification to all online artists
    artists.forEach((artist) => {
      const artistSocketId = onlineArtists[artist._id.toString()];
      if (artistSocketId) {
        io.to(artistSocketId).emit("new-request", {
          message: `New customization request received! Budget: ${request.budget}, Time: ${request.time}`,
          request: {
            _id: request._id,
            budget: request.budget,
            time: request.time,
            userId: request.userId
          }
        });
      }
    });

    res.json({ success: true, message: "Request submitted successfully!", request });

  } catch (error) {
    console.error("Error submitting request:", error);
    res.status(500).json({ success: false, message: "Error submitting request", error });
  }
};






// Get all requests
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find({});
    res.json({ success: true, notifications: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching requests', error });
  }
};


// Update request status
exports.updateRequestStatus = async (req, res) => {
  try {
    await Request.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ success: true, message: 'Request status updated!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating status', error });
  }
};
