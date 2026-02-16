import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: '#333',
      }}
    >
      <Link to="/" style={{ margin: '0 1rem', color: '#fff' }}>Home</Link>
      <Link to="/about" style={{ margin: '0 1rem', color: '#fff' }}>About</Link>
      <Link to="/services" style={{ margin: '0 1rem', color: '#fff' }}>Services</Link>
      <Link to="/contact" style={{ margin: '0 1rem', color: '#fff' }}>Contact</Link>
    </nav>
  );
}

export default Navbar;