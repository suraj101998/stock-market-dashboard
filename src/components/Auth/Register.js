// Register.js
import React, { useState } from 'react';
import { register } from '../../services/auth';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
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
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Email: </label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <label>Confirm Password: </label>
      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <br />
      <button style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 20px', fontSize: '16px', border: 'none', cursor: 'pointer' }} onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;
