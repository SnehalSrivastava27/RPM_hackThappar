// src/components/PatientAppointmentRequest.js (or similar)
import React, { useState, useEffect } from 'react';

export function PatientAppointmentRequest() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(''); 
  const [reason, setReason] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the auth token
        const response = await fetch('http://localhost:3000/api/doctors', { // Adjust API endpoint
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch doctors list');
        }
        const doctorsData = await response.json();
        setDoctors(doctorsData);
      } catch (err) {
        setError('Failed to load doctors'); 
        console.error(err);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Get the auth token
      const response = await fetch('http://localhost:3000/api/patient/appointment-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ doctorId: selectedDoctor, reason }),
      });

      if (!response.ok) {
        throw new Error('Failed to send appointment request');
      }

      setRequestSent(true);
      setReason(''); // Clear the form
      setSelectedDoctor(''); // Reset doctor selection

    } catch (err) {
      setError('Failed to send request. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Request an Appointment</h2>
      {error && <div className="text-red-500">{error}</div>} 
      {requestSent 
        ? <div className="text-green-500">Request sent successfully!</div>
        : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
                Select a Doctor:
              </label>
              <select 
                id="doctor" 
                className="mt-1 p-2 block w-full border rounded-md shadow-sm"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)} 
                required 
              >
                <option value="">Select...</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name} ({doctor.specialization})
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                Reason for Appointment:
              </label>
              <textarea
                id="reason"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm"
                rows={3} 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Send Request
            </button>
          </form>
        )
      }
    </div>
  );
}
