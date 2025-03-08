const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
  serviceId: String,
  budget: String,
  time: String,
  description: String,
  image: String,
  interested_people: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model('Request', RequestSchema);
