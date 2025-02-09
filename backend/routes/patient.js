const express = require('express');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');
const Patient = require('../models/Patient');
const Vitals = require('../models/Vitals');
const Alert = require('../models/Alert');
const mongoose = require('mongoose'); 
const AppointmentRequest = require('../models/AppointmentRequest');
const { checkVitalsThresholds } = require('../utils/vitalHelper');

const router = express.Router();

router.post('/vitals', auth, checkRole('patient'), async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user._id });
    
    const vitals = new Vitals({
      patientId: patient._id,
      ...req.body
    });
    
    await vitals.save();
    
    if (checkVitalsThresholds(req.body)) {
      const alert = new Alert({
        patientId: patient._id,
        type: 'Abnormal Vitals',
        message: 'Abnormal vital signs detected'
      });
      await alert.save();
    }
    
    res.status(201).send(vitals);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/emergency-alert', auth, checkRole('patient'), async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user._id });
    
    const alert = new Alert({
      patientId: patient._id,
      type: 'Emergency',
      message: req.body.message || 'Emergency alert triggered by patient'
    });
    
    await alert.save();
    res.status(201).send(alert);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/assign-doctor', auth, checkRole('patient'), async (req, res) => {
    try {
      const { doctorId } = req.body;
      const patient = await Patient.findOne({ userId: req.user._id });
      
      if (!patient) {
        return res.status(404).send({ error: 'Patient not found' });
      }
  
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).send({ error: 'Doctor not found' });
      }
  
      if (!doctor.acceptingPatients) {
        return res.status(400).send({ error: 'Doctor is not accepting new patients' });
      }
  
      patient.doctorId = doctorId;
      patient.assignmentDate = new Date();
      await patient.save();
  
      // Update doctor's patient count
      doctor.patientCount += 1;
      await doctor.save();
  
      res.send(patient);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.post('/appointment-request', auth, checkRole('patient'), async (req, res) => {
    try {
      console.log("User from auth middleware:", req.user);  // Check user authentication
      const patient = await Patient.findOne({ userId: req.user._id });
      console.log("Patient found:", patient);  // Ensure the patient exists
  
      const { doctorId, reason } = req.body;
      console.log("Received doctorId:", doctorId);
      console.log("Received reason:", reason);
  
      if (!patient) {
        return res.status(400).json({ message: "Patient not found" });
      }
      if (!doctorId) {
        return res.status(400).json({ message: "doctorId is required" });
      }
      if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        return res.status(400).json({ message: "Invalid doctorId format" });
      }
  
      const request = new AppointmentRequest({
        patientId: patient._id,
        doctorId, 
        reason,
      });
  
      await request.save();
      res.status(201).send(request);
    } catch (error) {
      console.error("Error in appointment-request:", error);
      res.status(400).json({ message: error.message });
    }
  });
  

module.exports = router;
