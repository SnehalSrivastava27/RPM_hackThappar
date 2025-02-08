const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  condition: { type: String },
  riskLevel: { type: String, enum: ['Low', 'Moderate', 'High'], default: 'Low' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  assignmentDate: { type: Date },
  vitalCheckFrequency: { 
    type: Number,
    default: 24
  },
  lastVitalUpdate: { type: Date }
});

module.exports = mongoose.model('Patient', patientSchema);