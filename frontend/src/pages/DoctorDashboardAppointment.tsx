import React, { useEffect, useState } from 'react';
const DoctorDashboardAppointment=()=>{
    const [pendingRequests, setPendingRequests] = useState([]);
     useEffect(() => {
        const fetchPendingRequests = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/doctor/appointment-requests', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }); 
    
            if (!response.ok) {
              throw new Error('Failed to fetch appointment requests');
            }
    
            const requestsData = await response.json();
            setPendingRequests(requestsData.filter(request => request.status === 'Pending'));
          } catch (err) {
            console.error('Error fetching pending requests:', err);
          }
        };
    
        fetchPendingRequests();
      }, []);
    return(
        <div> 
    <h3 className="text-lg font-semibold mb-2">Pending Appointment Requests</h3>
    {pendingRequests.length === 0 
      ? <p>No pending requests.</p> 
      : ( 
        <ul>
          {pendingRequests.map(request => (
            <li key={request._id} className="bg-white p-4 rounded-md shadow-sm mb-2">
              <p><strong>Patient:</strong> {request.patientId.name}</p> {/* Assuming you populated the patientId */}
              <p><strong>Reason:</strong> {request.reason}</p>
              {/* Add buttons or logic to approve/reject requests */}
            </li>
          ))}
        </ul>
      )}
  </div>
    )
}

export default DoctorDashboardAppointment;