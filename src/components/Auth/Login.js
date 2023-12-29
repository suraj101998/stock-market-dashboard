// Login.js
import React, { useState } from 'react';
import { login } from '../../services/auth';

const loginContainerStyle = {
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

const Login = ({ onLogin, onToggleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userData = await login(email, password);
      onLogin(userData);
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={loginContainerStyle}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Email: </label>
      <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password: </label>
      <input style={inputStyle} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button style={buttonStyle} onClick={handleLogin}>
        Login
      </button>
      <br />
      <p>
        Don't have an account?{' '}
        <button
          style={{ ...buttonStyle, backgroundColor: '#008CBA' }}
          onClick={onToggleRegister}
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;
