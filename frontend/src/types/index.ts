export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  vitals: Vitals;
  lastUpdate: string;
}

export interface Vitals {
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  temperature: number;
  spO2: number;
  glucose: number;
}

export interface HealthChallenge {
  id: string;
  title: string;
  description: string;
  target: number;
  progress: number;
  reward: number;
  deadline: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: 'Virtual' | 'In-Person';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}