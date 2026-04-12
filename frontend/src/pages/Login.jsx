import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      
      setMessage("✅ Login successful! Redirecting...");

      // Store user data and token for the Navbar and Protected Routes
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Redirect based on role returned from your backend
      const role = res.data.user.role;

      // Small delay for UX so they see the success message
      setTimeout(() => {
        if (role === "student") navigate("/student");
        else if (role === "faculty") navigate("/teacher");
        else if (role === "admin") navigate("/admin");
      }, 1000);

    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className="subtitle">Access your Edu_web dashboard</p>

        {message && (
          <p className={`message ${message.includes("✅") ? "success" : "error"}`}>
            {message}
          </p>
        )}

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="name@college.edu"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Verifying..." : "Login"}
        </button>

        <p className="register-link">
          New to Edu_web? <span onClick={() => navigate("/register")}>Create Account</span>
        </p>
      </form>
    </div>
  );
}

export default Login;