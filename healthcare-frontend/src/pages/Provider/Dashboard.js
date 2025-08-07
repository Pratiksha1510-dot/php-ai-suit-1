import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <header style={{ background: '#007bff', color: '#fff', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <h2>Welcome, {user?.name || 'User'} ({user?.role || ''})</h2>
        <button onClick={handleLogout} style={{ padding: '5px 10px' }}>Logout</button>
      </header>

      <main style={{ padding: '20px' }}>
        <h1>Provider Dashboard</h1>
        <p>Welcome, Provider!</p>

        <button
          onClick={() => navigate('/provider/availability')}
          style={{ padding: '10px 20px', marginTop: '20px', backgroundColor: '#28a745', color: '#fff', border: 'none' }}
        >
          Manage Availability
        </button>
      </main>
    </div>
  );
};

export default ProviderDashboard;
