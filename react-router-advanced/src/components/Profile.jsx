import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  const linkStyle = ({ isActive }) => ({
    display: 'inline-block',
    marginRight: '1rem',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    textDecoration: 'none',
    backgroundColor: isActive ? '#e94560' : '#ddd',
    color: isActive ? '#fff' : '#333',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <div>
      <h1>My Profile</h1>
      <p>Logged in as: <strong>{user?.name}</strong></p>

      <nav style={{ margin: '1rem 0' }}>
        <NavLink to="details" style={linkStyle}>Details</NavLink>
        <NavLink to="settings" style={linkStyle}>Settings</NavLink>
      </nav>

      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;