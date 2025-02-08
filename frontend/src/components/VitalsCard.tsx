import React from 'react';
import { Heart, Thermometer, Activity, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';
import { Vitals } from '../types';

interface VitalsCardProps {
  vitals: Vitals;
}

export function VitalsCard({ vitals }: VitalsCardProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-4 rounded-xl shadow-sm"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Heart className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Heart Rate</p>
            <p className="text-xl font-semibold">{vitals.heartRate} BPM</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-4 rounded-xl shadow-sm"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Activity className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Blood Pressure</p>
            <p className="text-xl font-semibold">
              {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-4 rounded-xl shadow-sm"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Thermometer className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="text-xl font-semibold">{vitals.temperature}°F</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-4 rounded-xl shadow-sm"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Droplet className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">SpO2</p>
            <p className="text-xl font-semibold">{vitals.spO2}%</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}