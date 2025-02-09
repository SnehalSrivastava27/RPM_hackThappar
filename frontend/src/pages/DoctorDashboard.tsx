import React, { useEffect, useState } from 'react';
import { Search, Users, Bell, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  riskLevel: string;
  vitals: {
    heartRate?: number;
    bloodPressure?: { systolic: number; diastolic: number };
    temperature?: number;
    spO2?: number;
    glucose?: number;
  } | null;
  lastUpdate: string;
  approvedAppointments: Array<{
    appointmentId: string;
    reason: string;
    requestDate: string;
  }>;
}

interface DashboardData {
  patients: Patient[];
  totalPatients: number;
}

export function DoctorDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    patients: [],
    totalPatients: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       const response = await fetch('http://localhost:3000/api/doctor/my-patients', {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch dashboard data');
  //       }

  //       const data = await response.json();
  //       setDashboardData(data);
  //     } catch (err) {
  //       setError('Failed to load dashboard data');
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/doctor/my-patients', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
  
        const data = await response.json();
        console.log('Received dashboard data:', data); // Add this log
        setDashboardData(data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardData();
  }, []);
  useEffect(() => {
    console.log('Dashboard data updated:', dashboardData);
  }, [dashboardData])
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

  const filteredPatients = dashboardData.patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const criticalPatients = dashboardData.patients.filter(p => p.riskLevel === 'High').length;
  const todaysAppointments = 8; // This should be fetched from backend

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="text-xl font-semibold">{dashboardData.totalPatients}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Bell className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Critical Cases</p>
              <p className="text-xl font-semibold">{criticalPatients}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Today's Appointments</p>
              <p className="text-xl font-semibold">{todaysAppointments}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Patient List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Patients Requiring Attention</h2>
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <motion.div
              key={patient.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white p-4 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{patient.name}</h3>
                  <p className="text-sm text-gray-500">
                    {patient.age} years • {patient.gender} • {patient.condition}
                  </p>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      patient.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                      patient.riskLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {patient.riskLevel} Risk
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Last update</p>
                  <p className="text-sm font-medium">{patient.lastUpdate}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* request*/}
      {/* Approved Appointments Section */}
<div>
  <h2 className="text-xl font-semibold mb-4">Approved Appointments</h2>
  <div className="space-y-4">
    {filteredPatients.map((patient) => (
      patient.approvedAppointments && patient.approvedAppointments.length > 0 && (
        <motion.div
          key={patient.id}
          whileHover={{ scale: 1.01 }}
          className="bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{patient.name}</h3>
              {patient.approvedAppointments.map((appointment) => (
                <div key={appointment.appointmentId} className="mt-2">
                  <p className="text-sm text-gray-500">
                    Reason: {appointment.reason}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(appointment.requestDate).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )
    ))}
  </div>
</div>
    {/* Patient List */}
<div>
  <h2 className="text-xl font-semibold mb-4">Patients Requiring Attention</h2>
  <div className="space-y-4">
    {filteredPatients.length > 0 ? (
      filteredPatients.map((patient) => (
        <motion.div
          key={patient.id}
          whileHover={{ scale: 1.01 }}
          className="bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{patient.name}</h3>
              <p className="text-sm text-gray-500">
                {patient.age} years • {patient.gender} • {patient.condition}
              </p>
              <div className="mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  patient.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                  patient.riskLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {patient.riskLevel} Risk
                </span>
              </div>
              {patient.vitals && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Latest Vitals:</p>
                  {patient.vitals.heartRate && <p>Heart Rate: {patient.vitals.heartRate} bpm</p>}
                  {patient.vitals.bloodPressure && (
                    <p>BP: {patient.vitals.bloodPressure.systolic}/{patient.vitals.bloodPressure.diastolic}</p>
                  )}
                  {patient.vitals.temperature && <p>Temperature: {patient.vitals.temperature}°C</p>}
                  {patient.vitals.spO2 && <p>SpO2: {patient.vitals.spO2}%</p>}
                  {patient.vitals.glucose && <p>Glucose: {patient.vitals.glucose} mg/dL</p>}
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last update</p>
              <p className="text-sm font-medium">{patient.lastUpdate}</p>
            </div>
          </div>
        </motion.div>
      ))
    ) : (
      <div className="text-center py-4 text-gray-500">
        No patients found
      </div>
    )}
  </div>
</div>
    </div>
  );
}