const Request = require('../Models/request');

// Submit a new customization request
exports.submitRequest = async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.json({ success: true, message: 'Request submitted successfully!', request });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting request', error });
  }
};

// Get all requests
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
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
