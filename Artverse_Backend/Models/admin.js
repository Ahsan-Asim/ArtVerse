const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // for password hashing

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // ensures the email is unique
      lowercase: true, // optional, to automatically store emails in lowercase
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['user', 'artist','admin'],
      default: 'admin',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

// Hash the password before saving the admin
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // if password is not modified, skip hashing
  try {
    const salt = await bcrypt.genSalt(10); // generate a salt
    this.password = await bcrypt.hash(this.password, salt); // hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords during login
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password); // compare provided password with stored hashed password
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
