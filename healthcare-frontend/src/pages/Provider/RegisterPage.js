// src/pages/Provider/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProviderRegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/v1/provider/register', formData);
      alert('Provider registered successfully');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Provider Registration</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input className="form-control mb-3" placeholder="Email" type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input className="form-control mb-3" placeholder="Password" type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default ProviderRegisterPage;
