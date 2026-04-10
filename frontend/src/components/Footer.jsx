import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Left Section */}
        <div className="footer-left">
          <h3>College Management System</h3>
          <p>Manage students, teachers, and courses efficiently.</p>
        </div>

        {/* Middle Section */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Login</li>
            <li>Register</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <h4>Contact</h4>
          <p>Email: support@cms.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 CollegeMS. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;