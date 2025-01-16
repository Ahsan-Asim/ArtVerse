const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
  },
  phone: {
    type: String,
    match: [/^\d{10}$/, 'Please enter a valid phone number'], 
  },
  password: {
    type: String,
    minlength: 6, 
  },
  role: {
    type: String,
    enum: ['user', 'artist', 'admin'], 
    default: 'user', 
  },
  googleId: {
    type: String,
  },
  artistDetails: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
  },
  artworks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Artwork', 
    },
  ],
  isVerified: {
    type: Boolean,
    default: false, 
  },
  isBlocked: {
    type: Boolean,
    default: false, 
  },
  follows: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Artist', // Referencing the Artist model
    },
  ],
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
