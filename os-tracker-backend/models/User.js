const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  login: { type: String, required: true },
  name: { type: String },
  avatar: { type: String }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  status: {
    type: String,
    enum: ['PENDING', 'ACTIVE'],
    default: 'PENDING'
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  favorites: [favoriteSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
