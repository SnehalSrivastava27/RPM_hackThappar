const express = require('express');
const AppointmentRequest = require('../models/AppointmentRequest');
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// Update appointment request status (Approve or Reject)
router.patch('/appointment-requests/:id', async (req, res) => {
    try {
        const { status } = req.body;

        // Ensure status is valid
        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status update' });
        }

        // Find and update the appointment request
        const updatedRequest = await AppointmentRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Appointment request not found' });
        }

        res.json({ message: `Request ${status.toLowerCase()} successfully`, updatedRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment request', error });
    }
});

module.exports = router;
