const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: String,
  name: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  status: {
    type: String,
    default: 'Pending'
  },
  description: String,
  submittedAt: {
    type: Date,
    default: Date.now
  },
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);

