import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1 style={{ fontSize: '4rem' }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The path <code>{location.pathname}</code> does not exist.</p>
      <Link to="/" style={{ color: '#e94560' }}>Go back Home</Link>
    </div>
  );
};

export default NotFound;