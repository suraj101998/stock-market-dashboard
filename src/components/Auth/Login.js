import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { login } from '../../services/auth';

const Login = () => {
  // const history = useHistory();
  const [email, setEmail] = useState('surajchakraborty82@gmail.com');
  const [password, setPassword] = useState('Suraj@101998');

  const handleLogin = async () => {
    try {
      await login(email, password);
      // history.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
