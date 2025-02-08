const express = require('express');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');
const Patient = require('../models/Patient');
const Vitals = require('../models/Vitals');

const router = express.Router();

router.get('/patients', auth, checkRole('doctor'), async (req, res) => {
  try {
    const patients = await Patient.find({ assignedDoctor: req.user._id })
      .populate('userId', ['name', 'email']);
    res.send(patients);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/patient/:id/vitals', auth, checkRole('doctor'), async (req, res) => {
  try {
    const vitals = await Vitals.find({ patientId: req.params.id })
      .sort({ timestamp: -1 })
      .limit(10);
    res.send(vitals);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/patient/:id/frequency', auth, checkRole('doctor'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    patient.vitalCheckFrequency = req.body.frequency;
    await patient.save();
    res.send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;