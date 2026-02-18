import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to React Router Advanced</h1>
      <p>This app demonstrates nested routes, protected routes, and dynamic routing.</p>

      <h2 style={{ marginTop: '2rem' }}>Features</h2>
      <ul>
        <li><Link to="/profile">Protected Route (login required)</Link></li>
        <li><Link to="/blog/react-hooks-guide">Dynamic Route: react-hooks-guide</Link></li>
        <li><Link to="/blog/react-router-v6">Dynamic Route: react-router-v6</Link></li>
        <li><Link to="/blog/unknown-post">Dynamic Route: unknown-post (graceful fallback)</Link></li>
        <li><Link to="/nonexistent">404 Not Found</Link></li>
      </ul>
    </div>
  );
};

export default Home;