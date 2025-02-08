import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Layout} from './components/Layout';
import {PatientDashboard} from './pages/PatientDashboard';
import {DoctorDashboard} from './pages/DoctorDashboard';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
