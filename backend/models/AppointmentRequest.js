const mongoose = require('mongoose');

const appointmentRequestSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  requestDate: { type: Date, default: Date.now },
  reason: { type: String, required: true }, // Brief description of the reason
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
});

module.exports = mongoose.model('AppointmentRequest', appointmentRequestSchema);
