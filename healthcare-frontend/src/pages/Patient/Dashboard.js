import React from 'react';

const DashboardLayout = ({ user, children }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <header
        style={{
          background: '#007bff',
          color: '#fff',
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
      <h2>welcome</h2>  <h2>Patient: {user?.name || 'aarav'}</h2>
        <button onClick={handleLogout} style={{ padding: '5px 10px' }}>
          Logout
        </button>
      </header>
      <main style={{ padding: '20px' }}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
