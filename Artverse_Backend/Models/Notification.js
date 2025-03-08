// const mongoose = require('mongoose');

// const NotificationSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   message: String,
//   requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
//   isRead: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Notification', NotificationSchema);


const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who placed the request
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true }, // Reference to the request
  message: { type: String, required: true }, // Notification message
  isRead: { type: Boolean, default: false },
});

module.exports = mongoose.model('Notification', NotificationSchema);
