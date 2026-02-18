import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>ReactRouter Advanced</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/blog/react-hooks-guide" style={styles.link}>Blog</Link>
        {isAuthenticated ? (
          <>
            <Link to="/profile/details" style={styles.link}>Profile</Link>
            <span style={styles.user}>Hi, {user?.name}</span>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={styles.btn}>Login</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1a1a2e',
    color: '#fff',
  },
  brand: {
    color: '#e94560',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  links: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
  },
  user: {
    color: '#64ffda',
    fontSize: '0.9rem',
  },
  btn: {
    background: '#e94560',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
};

export default Navbar;