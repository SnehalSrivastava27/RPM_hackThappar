import React from 'react';
import { Search, Users, Bell, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Patient } from '../types';

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Mr X',
    age: 45,
    gender: 'Male',
    condition: 'Hypertension',
    riskLevel: 'Moderate',
    vitals: {
      heartRate: 85,
      bloodPressure: { systolic: 140, diastolic: 90 },
      temperature: 98.6,
      spO2: 97,
      glucose: 110
    },
    lastUpdate: '5 minutes ago'
  },
];

export function DoctorDashboard() {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <p className="text-xl font-semibold">1</p>
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
              <p className="text-xl font-semibold">12</p>
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
              <p className="text-xl font-semibold">8</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Patient List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Patients Requiring Attention</h2>
        <div className="space-y-4">
          {mockPatients.map((patient) => (
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
    </div>
  );
}