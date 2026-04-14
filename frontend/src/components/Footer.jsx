import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaEnvelope, FaPhone, FaGraduationCap } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-brand">
          <div className="footer-logo">
            <FaGraduationCap className="f-logo-icon" />
            <span>Edu_web</span>
          </div>
          <p className="footer-motto">
            Human Education for <span>Technical Excellence</span>
          </p>
        </div>

        <div className="footer-links">
          <h4>Platform</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/features">AI Features</Link>
        </div>

        <div className="footer-links">
          <h4>Portals</h4>
           <Link to="/login">Student</Link>
          <Link to="/login">Faculty</Link> 
         
          <Link to="/register">Register</Link>
        </div>

        <div className="footer-contact">
          <h4>Connect</h4>
          <div className="contact-item">
            <FaEnvelope className="c-icon" /> <span>support@nexgen.edu</span>
          </div>
          <div className="contact-item">
            <FaPhone className="c-icon" /> <span>+91 98765 43210</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Edu_web Management. Built with MERN.</p>
        <div className="bottom-links">
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;