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
      <div className="brand-container" onClick={() => navigate("/")}>
        <div className="logo">
          <FaGraduationCap className="logo-icon" />
          <span>Edu_web</span>
        </div>
        <div className="motto">Human Education for Technical Excellence</div>
      </div>

      <div className="nav-content">
        <ul className="nav-links">
          <li><Link to="/" className={isActive("/")}>Home</Link></li>
          <li><Link to="/about" className={isActive("/about")}>About</Link></li>

          {user?.role === "student" && (
            <li><Link to="/student" className={isActive("/student")}>Dashboard</Link></li>
          )}
          {user?.role === "faculty" && (
            <li><Link to="/teacher" className={isActive("/teacher")}>Dashboard</Link></li>
          )}
          {user?.role === "admin" && (
            <li><Link to="/admin" className={isActive("/admin")}>Dashboard</Link></li>
          )}
        </ul>

        <div className="auth-section">
          {!user ? (
            <div className="auth-btns">
              <Link to="/login" className={`login-link ${isActive("/login")}`}>
                Login
              </Link>
              <Link to="/register" className={`register-btn-modern ${isActive("/register")}`}>
                Register
              </Link>
            </div>
          ) : (
            <div className="user-profile">
              <div className="profile-main">
                <FaUserCircle className="user-avatar" />
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">{user.role}</span>
                </div>
              </div>
              <button className="logout-pill" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;