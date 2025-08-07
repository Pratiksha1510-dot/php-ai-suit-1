// src/pages/Common/Register.js
import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="container mt-5">
      <h2>Select Registration Type</h2>
      <Link to="/register/provider" className="btn btn-primary m-2">Provider Registration</Link>
      <Link to="/register/patient" className="btn btn-success m-2">Patient Registration</Link>
    </div>
  );
};

export default Register;
