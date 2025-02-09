import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Layout} from './components/Layout';
import {PatientDashboard} from './pages/PatientDashboard';
import {DoctorDashboard} from './pages/DoctorDashboard';
import LandingPage from './pages/LandingPage1';
import { Login, Signup } from './pages/Auth';
import DoctorDashboardAppointment from './pages/DoctorDashboardAppointment';

function App() {
  return (
    <Router basename="/">
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor/appointments" element={<DoctorDashboardAppointment />} />
        </Routes>
      </Layout>
    </Router>
  );
}


export default App;
