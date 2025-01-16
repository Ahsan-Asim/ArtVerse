// const Artwork = require('../Models/artwork');
// const path = require('path');

// // Controller function to handle artwork upload
// exports.uploadArtwork = async (req, res) => {
//   const { title, category, subject, yearProduced, medium, material, style, price, height, width, depth, description } = req.body;
//   const image = req.file; // The uploaded file from Multer

//   if (!image) {
//     return res.status(400).json({ message: "Image file is required." });
//   }

//   try {
//     const newArtwork = new Artwork({
//       image: `/uploads/artworks/${image.filename}`, // Store image path
//       title,
//       category,
//       subject,
//       yearProduced,
//       medium,
//       material,
//       style,
//       price,
//       height,
//       width,
//       depth,
//       description,
//       artist: req.user.email, // Assuming the user is authenticated and the artist is logged in
//     });

//     await newArtwork.save();
//     res.status(200).json({ message: 'Artwork uploaded successfully', artwork: newArtwork });
//   } catch (error) {
//     console.error("Error uploading artwork:", error);
//     res.status(500).json({ message: 'Error saving artwork.' });
//   }
// };



const Artwork = require('../Models/artwork');
const User = require('../Models/user'); // Import the User model
const path = require('path');

// Controller function to handle artwork upload
exports.uploadArtwork = async (req, res) => {
  const { 
    title, category, subject, yearProduced, medium, material, style, price, 
    height, width, depth, description 
  } = req.body;
  const image = req.file; // The uploaded file from Multer

  if (!image) {
    return res.status(400).json({ message: "Image file is required." });
  }

  try {
    // Create and save the artwork
    const newArtwork = new Artwork({
      image: `/uploads/artworks/${image.filename}`, // Store image path
      title,
      category,
      subject,
      yearProduced,
      medium,
      material,
      style,
      price,
      height,
      width,
      depth,
      description,
      artist: req.user.email, // Assuming the user is authenticated and the artist is logged in
    });

    await newArtwork.save();

    // Find the user and add the artwork to the user's `artworks` array
    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email }, // Match the email of the logged-in artist
      { $push: { artworks: newArtwork._id } }, // Add the artwork ID to the artworks array
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ 
      message: 'Artwork uploaded successfully', 
      artwork: newArtwork, 
      user: updatedUser // Optional: Include the updated user in the response
    });
  } catch (error) {
    console.error("Error uploading artwork:", error);
    res.status(500).json({ message: 'Error saving artwork.' });
  }
};