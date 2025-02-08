import React from 'react';
import { VitalsCard } from '../components/VitalsCard';
import { RiskIndicator } from '../components/RiskIndicator';
import { Bell, Trophy, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const mockVitals = {
  heartRate: 75,
  bloodPressure: { systolic: 120, diastolic: 80 },
  temperature: 98.6,
  spO2: 98,
  glucose: 95
};

export function PatientDashboard() {
  return (
    <div className="space-y-6">
      {/* Emergency Alert Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2"
      >
        <Bell className="h-5 w-5" />
        <span>Emergency Alert</span>
      </motion.button>

      {/* Risk Level */}
      <RiskIndicator level="Low" />

      {/* Vitals */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Vitals</h2>
        <VitalsCard vitals={mockVitals} />
      </div>

      {/* Daily Challenges */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Daily Challenges</h2>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Trophy className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="font-medium">Walk 5,000 Steps</p>
                <div className="w-48 h-2 bg-gray-200 rounded-full mt-2">
                  <div className="w-3/4 h-2 bg-yellow-500 rounded-full" />
                </div>
              </div>
            </div>
            <p className="text-lg font-semibold">3,750/5,000</p>
          </div>
        </motion.div>
      </div>

      {/* AI Assistant */}
      <div>
        <h2 className="text-xl font-semibold mb-4">AI Health Assistant</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="w-full bg-white p-4 rounded-xl shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">Ask me anything</p>
              <p className="text-sm text-gray-500">Get instant health advice</p>
            </div>
          </div>
        </motion.button>
      </div>
    </div>
  );
}