import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to College Management System</h1>
        <p>
          Manage students, teachers, attendance, and assignments in one place.
        </p>
        <button className="hero-btn">Get Started</button>
      </section>

      {/* Features Section */}
      <section className="features">

        <div className="card">
          <h3>Student Management</h3>
          <p>Track student data, attendance, and performance easily.</p>
        </div>

        <div className="card">
          <h3>Teacher Dashboard</h3>
          <p>Manage classes, assignments, and grading system.</p>
        </div>

        <div className="card">
          <h3>Admin Control</h3>
          <p>Full control over system, users, and reports.</p>
        </div>

      </section>

    </div>
  );
}

export default Home;