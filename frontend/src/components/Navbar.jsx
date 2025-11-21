import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">📋</span>
          <span>TaskManager</span>
        </Link>

        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <Link to="/admin/dashboard" className="nav-link">
                  📊 Admin Dashboard
                </Link>
              ) : (
                <Link to="/dashboard" className="nav-link">
                  📋 My Tasks
                </Link>
              )}
              <div className="user-info">
                <span className="username">{user?.username}</span>
                <span className={`badge badge-${user?.role}`}>
                  {user?.role}
                </span>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                User Login
              </Link>
              <Link to="/admin/login" className="nav-link">
                Admin Login
              </Link>
              <Link to="/register">
                <button className="btn btn-primary">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;