// Register.js
import React, { useState } from 'react';
import { register } from '../../services/auth';

const registerContainerStyle = {
  textAlign: 'center',
  margin: '20px',
};

const inputStyle = {
  margin: '10px 0',
  padding: '8px',
  fontSize: '16px',
};

const buttonStyle = {
  backgroundColor: '#4caf50',
  color: 'white',
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
  cursor: 'pointer',
};

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    // Check if any field is empty
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userData = await register(email, password);
      onRegister(userData);
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div style={registerContainerStyle}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Email: </label>
      <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password: </label>
      <input style={inputStyle} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <label>Confirm Password: </label>
      <input
        style={inputStyle}
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br />
      <button style={buttonStyle} onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;
