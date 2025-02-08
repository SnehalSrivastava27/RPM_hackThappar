const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  type: { type: String, enum: ['Emergency', 'Missing Vitals', 'Abnormal Vitals'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['Active', 'Resolved'], default: 'Active' }
});

module.exports = mongoose.model('Alert', alertSchema);