const express = require('express');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');
const Patient = require('../models/Patient');
const Vitals = require('../models/Vitals');
const Alert = require('../models/Alert');
const { checkVitalsThresholds } = require('../utils/vitalsHelper');

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

module.exports = router;
