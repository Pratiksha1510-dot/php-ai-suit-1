// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ProviderDashboard from './pages/Provider/Dashboard';
import PatientDashboard from './pages/Patient/Dashboard';
import Availability from './pages/Provider/Availability';
 // ✅ Add this
import AddAvailability from './pages/Provider/AddAvailability';
 // ✅ Add this
import EditAvailability from './pages/Provider/EditAvailability';
import PrivateRoute from './components/PrivateRoute';
import AuthPage from './pages/Auth/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /auth */}
        <Route path="/" element={<Navigate to="/auth" />} />

        {/* Combined Login/Register */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Provider Routes */}
        <Route
          path="/provider/dashboard"
          element={
            <PrivateRoute role="provider">
              <ProviderDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/provider/availability"
          element={
            <PrivateRoute role="provider">
              <Availability />
            </PrivateRoute>
          }
        />

        {/* Patient Dashboard */}
        <Route
          path="/patient/dashboard"
          element={
            <PrivateRoute role="patient">
              <PatientDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/provider/availability/add" element={<PrivateRoute role="provider"><AddAvailability /></PrivateRoute>} />
<Route path="/provider/availability/edit/:id" element={<PrivateRoute role="provider"><EditAvailability /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
