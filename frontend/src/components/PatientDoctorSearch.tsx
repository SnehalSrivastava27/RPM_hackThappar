// src/components/PatientDoctorSearch.js 
import React, { useState, useEffect } from 'react';

export function PatientDoctorSearch() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/doctor/all-doctors'); 
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const doctorsData = await response.json();
        setDoctors(doctorsData);
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowConfirmDialog(true);
  };

//   const handleConfirmRequest = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:3000/api/patient/appointment-request', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ doctorId: selectedDoctor._id, reason: 'Appointment Request' }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send appointment request');
//       }

//       console.log('Appointment request sent!');
//       setShowConfirmDialog(false);
//     } catch (error) {
//       console.error('Error sending request:', error);
//     }
//   };
const handleConfirmRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/patient/appointment-request', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ doctorId: selectedDoctor._id, reason: 'Appointment Request' }),
      });

      if (!response.ok) {
        throw new Error('Failed to send appointment request'); 
      }

      // Handle success (e.g., close dialog, show success message)
      console.log('Appointment request sent!'); 
      setShowConfirmDialog(false);
      setSelectedDoctor(null); // Reset selected doctor

    } catch (error) {
      console.error('Error sending request:', error);
      // Handle error, e.g., display an error message to the user
    }
  };
  return (
    <div>
      <h2>Find a Doctor</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <ul>
        {filteredDoctors.map((doctor) => (
          <li
            key={doctor._id}
            onClick={() => handleDoctorClick(doctor)}
            className="bg-white p-4 rounded-md shadow-sm mb-2 cursor-pointer hover:bg-gray-100"
          >
            <h3 className="font-medium">{doctor.name}</h3>
          </li>
        ))}
      </ul>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>Are you sure you want to send an appointment request to Dr. {selectedDoctor.name}?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 mr-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRequest}
                className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
