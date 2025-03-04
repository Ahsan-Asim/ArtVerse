const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  serviceId: String,
  budget: String,
  time: String,
  description: String,
  image: String,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model('Request', RequestSchema);
