import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile/details';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }
    if (password !== 'password123') {
      setError('Incorrect password. Hint: password123');
      return;
    }
    login(username);
    navigate(from, { replace: true });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login</h1>
      {location.state?.from && (
        <p style={{ color: 'orange' }}>
          You must be logged in to visit <strong>{location.state.from.pathname}</strong>
        </p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Username:</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter any username"
            style={{ padding: '0.5rem', width: '100%' }}
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password123"
            style={{ padding: '0.5rem', width: '100%' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.6rem', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>
      <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#666' }}>
        Hint: use any username and password <code>password123</code>
      </p>
    </div>
  );
};

export default Login;