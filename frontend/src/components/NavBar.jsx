import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaGraduationCap } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* SECTION 1: Brand (Logo + Motto) */}
        <div className="brand-section" onClick={() => navigate("/")}>
          <div className="logo-wrapper">
            <FaGraduationCap className="logo-icon" />
            <span className="logo-text">Edu_web</span>
          </div>
          <p className="brand-motto">Human Education for Technical Excellence</p>
        </div>

        {/* SECTION 2: Navigation Links */}
        <div className="nav-links-wrapper">
          <ul className="nav-menu">
            <li><Link to="/" className={isActive("/")}>Home</Link></li>
            <li><Link to="/about" className={isActive("/about")}>About</Link></li>
            
            {user?.role === "student" && (
              <li><Link to="/student" className={isActive("/student")}>Student Dashboard</Link></li>
            )}
            {user?.role === "faculty" && (
              <li><Link to="/teacher" className={isActive("/teacher")}>Faculty Dashboard</Link></li>
            )}
            {user?.role === "admin" && (
              <li><Link to="/admin" className={isActive("/admin")}>Admin Portal</Link></li>
            )}
          </ul>
        </div>

        {/* SECTION 3: Auth / User Actions */}
        <div className="action-section">
          {!user ? (
            <div className="auth-group">
              <Link to="/login" className={`login-link ${isActive("/login")}`}>Login</Link>
              <Link to="/register" className="register-btn-modern">Register</Link>
            </div>
          ) : (
            <div className="user-profile-group">
              <div className="profile-pill">
                <FaUserCircle className="avatar-icon" />
                <div className="user-details">
                  <span className="u-name">{user.name}</span>
                  <span className="u-role">{user.role}</span>
                </div>
              </div>
              <button className="logout-btn-pill" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;