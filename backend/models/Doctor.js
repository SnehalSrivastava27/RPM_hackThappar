const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: String, required: true, default: "Physician" },
  acceptingPatients: { type: Boolean, default: true },
  patientCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Doctor', doctorSchema);
