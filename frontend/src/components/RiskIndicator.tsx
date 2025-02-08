import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface RiskIndicatorProps {
  level: 'Low' | 'Moderate' | 'High';
}

export function RiskIndicator({ level }: RiskIndicatorProps) {
  const colors = {
    Low: 'bg-green-100 text-green-700 border-green-200',
    Moderate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    High: 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg border ${colors[level]} flex items-center space-x-3`}
    >
      <AlertTriangle className="h-6 w-6" />
      <div>
        <p className="font-medium">Risk Level: {level}</p>
        <p className="text-sm opacity-75">
          {level === 'Low' && 'Your vitals are within normal range'}
          {level === 'Moderate' && 'Some vitals require attention'}
          {level === 'High' && 'Immediate medical attention recommended'}
        </p>
      </div>
    </motion.div>
  );
}