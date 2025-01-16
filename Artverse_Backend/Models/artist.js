// models/artist.js

const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  education: {
    type: String,
  },
  about: {
    type: String,
  },
  awards: {
    type: String,
  },
  certificates: {
    type: String,
  },
  image: { type: String }, // New field for the image path

});

module.exports = mongoose.model('Artist', artistSchema);
