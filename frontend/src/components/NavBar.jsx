import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // better than window.location
  };

  return (
    <nav className="navbar">

      {/* Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}

        {user?.role === "student" && (
          <li><Link to="/student">Dashboard</Link></li>
        )}

        {user?.role === "teacher" && (
          <li><Link to="/teacher">Dashboard</Link></li>
        )}

        {user?.role === "admin" && (
          <li><Link to="/admin">Dashboard</Link></li>
        )}
      </ul>

      {/* User Info */}
      {user && (
        <div className="user-section">
          <span>{user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;