import React, { useEffect, useState } from 'react';

const DoctorDashboardAppointment = () => {
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
                console.log("Fetched Requests:", requestsData); // Debugging line

                setPendingRequests(requestsData.filter(request => request.status === 'Pending'));
            } catch (err) {
                console.error('Error fetching pending requests:', err);
            }
        };

        fetchPendingRequests();
    }, []);

    const handleRequestAction = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/doctor/appointment-requests/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
    
            if (!response.ok) throw new Error(`Failed to ${status} request`);
    
            // Remove the processed request from UI
            setPendingRequests(prevRequests => prevRequests.filter(req => req._id !== id));
        } catch (err) {
            console.error(`Error updating request:`, err);
        }
    };
    
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Pending Appointment Requests</h3>
            {pendingRequests.length === 0 ? (
                <p>No pending requests.</p>
            ) : (
                <ul>
                    {pendingRequests.map(request => (
                        <li key={request._id} className="bg-white p-4 rounded-md shadow-sm mb-2">
                            <p><strong>Patient:</strong> {request.patientId?.name || "Unknown"}</p>
                            <p><strong>Reason:</strong> {request.reason}</p>
                            <div className="mt-2">
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                    onClick={() => handleRequestAction(request._id, 'Approved')}
                                >
                                    ✅ Approve
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleRequestAction(request._id, 'Rejected')}
                                >
                                    ❌ Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DoctorDashboardAppointment;
