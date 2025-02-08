const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const User = require('../models/User');

// Get doctor's patients with latest vitals
router.get('/my-patients', auth, checkRole('doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor) {
      return res.status(404).send({ error: 'Doctor not found' });
    }

    const patients = await Patient.find({ doctorId: doctor._id })
      .populate('userId', ['name', 'email'])
      .populate({
        path: 'vitals',
        options: { sort: { timestamp: -1 }, limit: 1 }
      });

    const formattedPatients = patients.map(patient => {
      const latestVitals = patient.vitals[0] || null;
      return {
        id: patient._id,
        name: patient.userId.name,
        age: patient.age,
        gender: patient.gender,
        condition: patient.condition,
        riskLevel: patient.riskLevel,
        vitals: latestVitals,
        lastUpdate: patient.lastVitalUpdate ? new Date(patient.lastVitalUpdate).toLocaleString() : 'No updates'
      };
    });

    res.send({
      patients: formattedPatients,
      totalPatients: patients.length
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router