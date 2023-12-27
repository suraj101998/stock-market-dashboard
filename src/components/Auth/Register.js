// // Register.js

// import React, { useState } from 'react';
// import { register } from '../../services/auth';

// const RegisterComponent = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async () => {
//     try {
//       await register(email, password);
//       // Optionally, you might want to auto-login the user after registration
//       // const userData = await login(email, password);
//       // onAuth(userData);
//     } catch (error) {
//       console.error('Registration failed:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <label>
//         Email:
//         <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//       </label>
//       <label>
//         Password:
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </label>
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// };

// export default RegisterComponent;


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
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Email: </label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <label>Confirm Password: </label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
