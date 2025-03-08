const multer = require("multer");

// Configure storage for uploaded images
const storage = multer.memoryStorage(); // Store image in memory (can be changed to disk)
const upload = multer({ storage: storage });

module.exports = upload;
