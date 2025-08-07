import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const AuthPage = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [role, setRole] = useState('patient'); // 'patient' or 'provider'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint =
      mode === 'login'
        ? `/${role}/login`
        : `/${role}/register`;

    try {
      const res = await api.post(endpoint, form);
      if (mode === 'login') {
        localStorage.setItem('token', res.data.access_token);
        toast.success('Login successful');
        navigate(role === 'provider' ? '/provider/dashboard' : '/patient/dashboard');
      } else {
        toast.success('Registration successful. Please login.');
        setMode('login');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Action failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 col-md-5">
      <div className="card shadow p-4">
        <div className="text-center mb-3">
          <button
            className={`btn btn-${mode === 'login' ? 'primary' : 'outline-primary'} mx-1`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`btn btn-${mode === 'register' ? 'primary' : 'outline-primary'} mx-1`}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <select name="role" value={role} onChange={(e) => setRole(e.target.value)} className="form-control mb-3">
            <option value="patient">Patient</option>
            <option value="provider">Provider</option>
          </select>

          {mode === 'register' && (
            <input
              type="text"
              name="name"
              className="form-control mb-3"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
