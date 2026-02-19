const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin', 'agent'], default: 'user' },
  isVerified: { type: Boolean, default: false },     // ✅ new
  otpCode: String                                     // ✅ new
});

module.exports = mongoose.model('User', userSchema);
