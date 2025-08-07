// src/pages/Common/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('provider');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const url =
      role === 'provider'
        ? 'http://localhost:8000/api/v1/provider/login'
        : 'http://localhost:8000/api/v1/patient/login';

    try {
      const res = await axios.post(url, { email, password });
      localStorage.setItem('token', res.data.access_token);

      // redirect to respective dashboard
      navigate(`/${role}/dashboard`);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Role</label>
          <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="provider">Provider</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
