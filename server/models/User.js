const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the User model
module.exports = mongoose.model.Users || mongoose.model("users", userSchema);