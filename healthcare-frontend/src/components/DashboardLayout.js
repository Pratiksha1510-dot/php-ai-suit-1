// src/components/DashboardLayout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ user, children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div className="dashboard-layout">
      <header style={{ backgroundColor: '#007bff', color: 'white', padding: '10px' }}>
        <h3>Welcome, {user?.name || 'User'} ({user?.role})</h3>
        <button onClick={handleLogout} style={{ float: 'right', background: 'white', color: '#007bff' }}>
          Logout
        </button>
      </header>
      <main style={{ padding: '20px' }}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
