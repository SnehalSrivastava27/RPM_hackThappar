const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  condition: { type: String },
  riskLevel: { type: String, enum: ['Low', 'Moderate', 'High'], default: 'Low' },
  assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vitalCheckFrequency: { 
    type: Number, // in hours
    default: 24
  }
});

module.exports = mongoose.model('Patient', patientSchema);