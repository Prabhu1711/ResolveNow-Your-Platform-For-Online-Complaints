const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaint');

// Create a new complaint
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      title,
      name,
      address,
      city,
      state,
      pincode,
      status,
      description
    } = req.body;

    const complaint = new Complaint({
      userId,
      title,
      name,
      address,
      city,
      state,
      pincode,
      status: status || 'Pending',
      description
    });

    await complaint.save();
    res.json({ message: 'Complaint submitted successfully', complaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit complaint' });
  }
});

// Get all complaints (with agent info populated)
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('assignedAgent', 'name email');
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// Assign agent to complaint
router.put('/:id/assign', async (req, res) => {
  const { agentId } = req.body;

  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { assignedAgent: agentId },
      { new: true }
    ).populate('assignedAgent', 'name email');
    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to assign agent' });
  }
});

// Update complaint status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: 'Error updating status' });
  }
});

// ✅ Get complaints assigned to a specific agent
router.get('/assigned/:agentId', async (req, res) => {
  try {
    const complaints = await Complaint.find({ assignedAgent: req.params.agentId });
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch agent complaints' });
  }
});


module.exports = router;
