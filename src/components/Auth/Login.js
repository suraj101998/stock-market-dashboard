// Login.js
import React, { useState } from 'react';
import { login } from '../../services/auth';

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
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Email: </label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 20px', fontSize: '16px', border: 'none', cursor: 'pointer' }} onClick={handleLogin}>
        Login
      </button>
      <br />
      <p>
        Don't have an account?{' '}
        <button style={{ backgroundColor: '#008CBA', color: 'white', padding: '10px 20px', fontSize: '16px', border: 'none', cursor: 'pointer' }} onClick={onToggleRegister}>
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;
