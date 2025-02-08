const mongoose = require('mongoose');

const vitalsSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  timestamp: { type: Date, default: Date.now },
  heartRate: { type: Number, required: true },
  bloodPressure: {
    systolic: { type: Number, required: true },
    diastolic: { type: Number, required: true }
  },
  temperature: { type: Number, required: true },
  spO2: { type: Number, required: true },
  glucose: { type: Number, required: true }
});

module.exports = mongoose.model('Vitals', vitalsSchema);