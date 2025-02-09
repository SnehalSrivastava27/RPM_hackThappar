const express = require('express');
const mongoose=require('mongoose');
const router = express.Router();
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const User = require('../models/User');

const AppointmentRequest = require('../models/AppointmentRequest');
// Get doctor's patients with latest vitals;



// router.get('/my-patients', auth, checkRole('doctor'), async (req, res) => {
//   try {
//     const doctor = await Doctor.findOne({ userId: req.user._id });
//     if (!doctor) {
//       return res.status(404).send({ error: 'Doctor not found' });
//     }

//     // Fetch all patients assigned to this doctor
//     const patients = await Patient.find({ doctorId: doctor._id })
//       .populate('userId', ['name', 'email'])
//       .populate({
//         path: 'vitals',
//         options: { sort: { timestamp: -1 }, limit: 1 }
//       });

//     // Fetch approved appointment requests for this doctor
//     const approvedRequests = await AppointmentRequest.find({
//       doctorId: doctor._id,
//       status: "Approved"
//     }).populate('patientId');

//     console.log("Approved Requests:", approvedRequests); // Debugging Log

//     const formattedPatients = patients.map(patient => {
//       const latestVitals = patient.vitals[0] || null;

//       // Filter approved requests related to this patient
//       const patientRequests = approvedRequests
//         .filter(req => req.patientId && req.patientId._id.toString() === patient._id.toString())
//         .map(req => ({
//           appointmentId: req._id,
//           reason: req.reason,
//           requestDate: req.requestDate
//         }));

//       return {
//         id: patient._id,
//         name: patient.userId.name,
//         age: patient.age,
//         gender: patient.gender,
//         condition: patient.condition,
//         riskLevel: patient.riskLevel,
//         vitals: latestVitals,
//         lastUpdate: patient.lastVitalUpdate ? new Date(patient.lastVitalUpdate).toLocaleString() : 'No updates',
//         approvedAppointments: patientRequests // Attach approved appointments
//       };
//     });

//     console.log("Formatted Patients:", formattedPatients); // Debugging Log

//     res.send({
//       patients: formattedPatients,
//       totalPatients: patients.length
//     });
//   } catch (error) {
//     console.error("Error fetching patients:", error);
//     res.status(500).send({ error: "Server Error" });
//   }
// });
// router.get('/my-patients', auth, checkRole('doctor'), async (req, res) => {
//     try {
//       // Log the authenticated user ID
//       console.log("Authenticated user ID:", req.user._id);
  
//       const doctor = await Doctor.findOne({ userId: req.user._id });
//       console.log("Found doctor:", doctor);
  
//       if (!doctor) {
//         return res.status(404).send({ error: 'Doctor not found' });
//       }
  
//       // Log the doctor ID we'll use for queries
//       console.log("Doctor ID for queries:", doctor._id);
  
//       // First check raw patients without populate
//       const rawPatients = await Patient.find({ doctorId: doctor._id });
//       console.log("Raw patients:", rawPatients);
  
//       // Then do the populated query
//       const patients = await Patient.find({ doctorId: doctor._id })
//         .populate('userId', ['name', 'email'])
//         .populate({
//           path: 'vitals',
//           options: { sort: { timestamp: -1 }, limit: 1 }
//         });
//       console.log("Populated patients:", patients);
  
//       // Check approved requests
//       const approvedRequests = await AppointmentRequest.find({
//         doctorId: doctor._id,
//         status: "Approved"
//       }).populate('patientId');
//       console.log("Approved requests:", approvedRequests);
  
//       // If we're getting here with no errors but empty results, log the query criteria
//       console.log("Query criteria for appointments:", {
//         doctorId: doctor._id,
//         status: "Approved"
//       });
  
//       const formattedPatients = patients.map(patient => {
//         // Log each patient being processed
//         console.log("Processing patient:", patient._id);
        
//         const latestVitals = patient.vitals[0] || null;
//         const patientRequests = approvedRequests
//           .filter(req => {
//             // Log the comparison values
//             console.log("Comparing:", {
//               requestPatientId: req.patientId?._id?.toString(),
//               currentPatientId: patient._id.toString()
//             });
//             return req.patientId && req.patientId._id.toString() === patient._id.toString();
//           })
//           .map(req => ({
//             appointmentId: req._id,
//             reason: req.reason,
//             requestDate: req.requestDate
//           }));
  
//         return {
//           id: patient._id,
//           name: patient.userId?.name,
//           age: patient.age,
//           gender: patient.gender,
//           condition: patient.condition,
//           riskLevel: patient.riskLevel,
//           vitals: latestVitals,
//           lastUpdate: patient.lastVitalUpdate ? new Date(patient.lastVitalUpdate).toLocaleString() : 'No updates',
//           approvedAppointments: patientRequests
//         };
//       });
  
//       res.send({
//         patients: formattedPatients,
//         totalPatients: patients.length
//       });
  
//     } catch (error) {
//       console.error("Detailed error:", error);
//       res.status(500).send({ error: "Server Error", details: error.message });
//     }
//   });
// router.get('/my-patients', auth, checkRole('doctor'), async (req, res) => {
//     try {
//       const doctor = await Doctor.findOne({ userId: req.user._id });
//       console.log("Found doctor:", doctor);
  
//       if (!doctor) {
//         return res.status(404).send({ error: 'Doctor not found' });
//       }
  
//       // Use userId instead of doctor._id
//       const patients = await Patient.find({ doctorId: req.user._id })
//         .populate('userId', ['name', 'email'])
//         .populate({
//           path: 'vitals',
//           options: { sort: { timestamp: -1 }, limit: 1 }
//         });
  
//       // Use userId for appointment query
//       const approvedRequests = await AppointmentRequest.find({
//         doctorId: req.user._id,
//         status: "Approved"
//       }).populate('patientId');
  
//       console.log("Approved Requests:", approvedRequests);
  
//       const formattedPatients = patients.map(patient => {
//         const latestVitals = patient.vitals[0] || null;
        
//         // Filter approved requests related to this patient
//         const patientRequests = approvedRequests
//           .filter(req => req.patientId && req.patientId._id.toString() === patient._id.toString())
//           .map(req => ({
//             appointmentId: req._id,
//             reason: req.reason,
//             requestDate: req.requestDate
//           }));
  
//         return {
//           id: patient._id,
//           name: patient.userId.name,
//           age: patient.age,
//           gender: patient.gender,
//           condition: patient.condition,
//           riskLevel: patient.riskLevel,
//           vitals: latestVitals,
//           lastUpdate: patient.lastVitalUpdate ? new Date(patient.lastVitalUpdate).toLocaleString() : 'No updates',
//           approvedAppointments: patientRequests
//         };
//       });
  
//       console.log("Formatted Patients:", formattedPatients);
  
//       res.send({
//         patients: formattedPatients,
//         totalPatients: patients.length
//       });
  
//     } catch (error) {
//       console.error("Error fetching patients:", error);
//       res.status(500).send({ error: "Server Error" });
//     }
//   });
router.get('/my-patients', auth, checkRole('doctor'), async (req, res) => {
    try {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      console.log("Found doctor:", doctor);
  
      if (!doctor) {
        return res.status(404).send({ error: 'Doctor not found' });
      }
  
      // Get approved requests
      const approvedRequests = await AppointmentRequest.find({
        doctorId: req.user._id,
        status: "Approved"
      }).populate({
        path: 'patientId',
        populate: {
          path: 'userId',
          select: 'name email'
        }
      });
  
      // Transform the data to match frontend expectations
      const formattedPatients = approvedRequests.map(request => {
        const patient = request.patientId;
        return {
          id: patient._id,
          name: patient.userId?.name || 'Unknown',
          age: patient.age,
          gender: patient.gender,
          condition: patient.condition,
          riskLevel: patient.riskLevel,
          vitals: null, // You can populate this if you have vitals data
          lastUpdate: new Date().toLocaleString(), // Update this with actual last update time
          approvedAppointments: [{
            appointmentId: request._id,
            reason: request.reason,
            requestDate: request.requestDate
          }]
        };
      });
  
      console.log("Formatted Patients:", formattedPatients);
  
      res.send({
        patients: formattedPatients,
        totalPatients: formattedPatients.length
      });
  
    } catch (error) {
      console.error("Error fetching patients:", error);
      res.status(500).send({ error: "Server Error" });
    }
  });
  
// router.get('/appointment-requests', auth, checkRole('doctor'), async (req, res) => {
//     try {
//       const requests = await AppointmentRequest.find({ doctorId: req.user._id }).populate('patientId'); 
//       res.send(requests); 
//     } catch (error) {
//       res.status(500).send(error); 
//     }
//   });
  

  // Update the status of an appointment request (Approve/Reject)

  router.get('/appointment-requests', auth, checkRole('doctor'), async (req, res) => {
    try {
        const requests = await AppointmentRequest.find({ doctorId: req.user._id }).populate('patientId'); 
        res.send(requests); 
    } catch (error) {
        console.error('🔥 Error fetching appointment requests:', error); // Logs the error in terminal
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});





  router.put('/appointment-requests/:requestId', auth, checkRole('doctor'), async (req, res) => {
    try {
      const request = await AppointmentRequest.findByIdAndUpdate(req.params.requestId, { status: req.body.status }, { new: true }); // "new: true" returns the updated document
      if (!request) {
        return res.status(404).send({ message: 'Request not found' }); 
      }
      res.send(request); 
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
router.get('/all-doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }, 'name'); // Only fetch 'name' field
    res.send(doctors);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/appointment-requests/:requestId', auth, checkRole('doctor'), async (req, res) => {
    try {
        const { status } = req.body;
        const request = await AppointmentRequest.findByIdAndUpdate(
            req.params.requestId,
            { status },
            { new: true }
        );

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.json(request);
    } catch (error) {
        console.error('🔥 Error updating appointment request:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router